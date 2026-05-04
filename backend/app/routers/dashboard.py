import logging
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.database import get_db
from app.models import User, WritingSubmission, ExamResult, Badge, UserBadge
from app.schemas import (
    DashboardResponse, UserResponse, ProgressResponse,
    WritingResponse, ExamResultResponse, BadgeResponse
)
from app.services.auth_service import get_current_user
from app.services.gamification_service import get_or_create_progress, xp_for_level

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/", response_model=DashboardResponse)
async def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        # Progress
        progress = await get_or_create_progress(db, current_user.id)
        xp_needed = xp_for_level(progress.level + 1) - progress.xp
        progress_resp = ProgressResponse(
            level=progress.level,
            xp=progress.xp,
            xp_to_next_level=max(0, xp_needed),
            current_streak=progress.current_streak,
            longest_streak=progress.longest_streak,
            last_activity_date=progress.last_activity_date,
            total_writings=progress.total_writings,
            total_exams=progress.total_exams,
        )
    except Exception as e:
        logger.error(f"Error loading progress: {e}")
        progress_resp = ProgressResponse(
            level=1, xp=0, xp_to_next_level=200,
            current_streak=0, longest_streak=0,
            last_activity_date=None, total_writings=0, total_exams=0,
        )

    # Recent writings (last 5)
    try:
        w_result = await db.execute(
            select(WritingSubmission)
            .options(selectinload(WritingSubmission.feedback))
            .where(WritingSubmission.user_id == current_user.id)
            .order_by(WritingSubmission.created_at.desc())
            .limit(5)
        )
        recent_writings = [WritingResponse.model_validate(w) for w in w_result.scalars().all()]
    except Exception as e:
        logger.error(f"Error loading writings: {e}")
        recent_writings = []

    # Band history
    band_history = []
    try:
        all_w = await db.execute(
            select(WritingSubmission)
            .options(selectinload(WritingSubmission.feedback))
            .where(WritingSubmission.user_id == current_user.id)
            .order_by(WritingSubmission.created_at.asc())
        )
        for w in all_w.scalars().all():
            if w.feedback and w.feedback.overall_band:
                band_history.append({
                    "date": w.created_at.isoformat(),
                    "band": float(w.feedback.overall_band),
                    "task_type": w.task_type,
                })
    except Exception as e:
        logger.error(f"Error loading band history: {e}")

    # Recent exam results
    try:
        e_result = await db.execute(
            select(ExamResult)
            .where(ExamResult.user_id == current_user.id)
            .order_by(ExamResult.created_at.desc())
            .limit(5)
        )
        recent_results = [ExamResultResponse.model_validate(r) for r in e_result.scalars().all()]
    except Exception as e:
        logger.error(f"Error loading exam results: {e}")
        recent_results = []

    # Badges
    badges = []
    try:
        b_result = await db.execute(select(Badge))
        all_badges = b_result.scalars().all()
        earned_result = await db.execute(
            select(UserBadge).where(UserBadge.user_id == current_user.id)
        )
        earned_map = {ub.badge_id: ub.earned_at for ub in earned_result.scalars().all()}
        badges = [
            BadgeResponse(
                id=b.id, name=b.name, description=b.description, icon=b.icon,
                earned=b.id in earned_map, earned_at=earned_map.get(b.id),
            )
            for b in all_badges
        ]
    except Exception as e:
        logger.error(f"Error loading badges: {e}")

    return DashboardResponse(
        user=UserResponse.model_validate(current_user),
        progress=progress_resp,
        recent_writings=recent_writings,
        recent_results=recent_results,
        badges=badges,
        writing_band_history=band_history,
    )