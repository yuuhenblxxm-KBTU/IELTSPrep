from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List
from app.database import get_db
from app.models import User, WritingSubmission, AIFeedback
from app.schemas import WritingSubmit, WritingResponse
from app.services.auth_service import get_current_user
from app.services.ai_service import get_ai_feedback
from app.services.gamification_service import add_xp_and_update, XP_PER_WRITING

router = APIRouter(prefix="/api/writing", tags=["Writing"])


@router.post("/submit", response_model=WritingResponse, status_code=201)
async def submit_writing(
    data: WritingSubmit,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    word_count = len(data.essay.split())

    submission = WritingSubmission(
        user_id=current_user.id,
        task_type=data.task_type,
        prompt=data.prompt,
        essay=data.essay,
        word_count=word_count,
    )
    db.add(submission)
    await db.flush()

    # Get AI feedback
    feedback_data = await get_ai_feedback(data.task_type, data.prompt or "", data.essay)

    feedback = AIFeedback(
        submission_id=submission.id,
        overall_band=feedback_data.get("overall_band"),
        task_achievement=feedback_data.get("task_achievement"),
        coherence_cohesion=feedback_data.get("coherence_cohesion"),
        lexical_resource=feedback_data.get("lexical_resource"),
        grammar_accuracy=feedback_data.get("grammar_accuracy"),
        feedback_text=feedback_data.get("feedback_text"),
        suggestions=feedback_data.get("suggestions"),
        strengths=feedback_data.get("strengths"),
    )
    db.add(feedback)
    await db.flush()

    # Update gamification
    await add_xp_and_update(db, current_user.id, XP_PER_WRITING, "writing")

    # Reload with feedback
    result = await db.execute(
        select(WritingSubmission)
        .options(selectinload(WritingSubmission.feedback))
        .where(WritingSubmission.id == submission.id)
    )
    full_submission = result.scalar_one()
    return WritingResponse.model_validate(full_submission)


@router.get("/history", response_model=List[WritingResponse])
async def get_writing_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(WritingSubmission)
        .options(selectinload(WritingSubmission.feedback))
        .where(WritingSubmission.user_id == current_user.id)
        .order_by(WritingSubmission.created_at.desc())
        .limit(50)
    )
    submissions = result.scalars().all()
    return [WritingResponse.model_validate(s) for s in submissions]


@router.get("/{submission_id}", response_model=WritingResponse)
async def get_submission(
    submission_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(WritingSubmission)
        .options(selectinload(WritingSubmission.feedback))
        .where(
            WritingSubmission.id == submission_id,
            WritingSubmission.user_id == current_user.id,
        )
    )
    submission = result.scalar_one_or_none()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return WritingResponse.model_validate(submission)
