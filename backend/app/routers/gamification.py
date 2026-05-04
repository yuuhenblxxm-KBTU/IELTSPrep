from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.database import get_db
from app.models import User, Badge, UserBadge
from app.schemas import ProgressResponse, BadgeResponse
from app.services.auth_service import get_current_user
from app.services.gamification_service import get_or_create_progress, xp_for_level

router = APIRouter(prefix="/api/gamification", tags=["Gamification"])


@router.get("/progress", response_model=ProgressResponse)
async def get_progress(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    progress = await get_or_create_progress(db, current_user.id)
    xp_needed = xp_for_level(progress.level + 1) - progress.xp
    return ProgressResponse(
        level=progress.level,
        xp=progress.xp,
        xp_to_next_level=max(0, xp_needed),
        current_streak=progress.current_streak,
        longest_streak=progress.longest_streak,
        last_activity_date=progress.last_activity_date,
        total_writings=progress.total_writings,
        total_exams=progress.total_exams,
    )


@router.get("/badges", response_model=List[BadgeResponse])
async def get_badges(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Badge))
    all_badges = result.scalars().all()

    earned_result = await db.execute(
        select(UserBadge).where(UserBadge.user_id == current_user.id)
    )
    earned_map = {ub.badge_id: ub.earned_at for ub in earned_result.scalars().all()}

    badges = []
    for badge in all_badges:
        badges.append(BadgeResponse(
            id=badge.id,
            name=badge.name,
            description=badge.description,
            icon=badge.icon,
            earned=badge.id in earned_map,
            earned_at=earned_map.get(badge.id),
        ))
    return badges
