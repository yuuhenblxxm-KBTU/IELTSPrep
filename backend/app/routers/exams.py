from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from typing import List
from app.database import get_db
from app.models import User, MockExam, ExamQuestion, ExamResult
from app.schemas import ExamListItem, ExamResponse, ExamSubmit, ExamResultResponse
from app.services.auth_service import get_current_user
from app.services.gamification_service import add_xp_and_update, XP_PER_EXAM

router = APIRouter(prefix="/api/exams", tags=["Exams"])


@router.get("/", response_model=List[ExamListItem])
async def list_exams(
    exam_type: str = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(MockExam)
    if exam_type:
        query = query.where(MockExam.exam_type == exam_type)
    query = query.order_by(MockExam.created_at.desc())

    result = await db.execute(query.options(selectinload(MockExam.questions)))
    exams = result.scalars().all()

    items = []
    for exam in exams:
        items.append(ExamListItem(
            id=exam.id,
            exam_type=exam.exam_type,
            title=exam.title,
            description=exam.description,
            time_limit=exam.time_limit,
            difficulty=exam.difficulty,
            question_count=len(exam.questions),
            created_at=exam.created_at,
        ))
    return items


@router.get("/{exam_id}", response_model=ExamResponse)
async def get_exam(
    exam_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(MockExam)
        .options(selectinload(MockExam.questions))
        .where(MockExam.id == exam_id)
    )
    exam = result.scalar_one_or_none()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    # Sort questions by order_num, remove correct_answer from response
    exam.questions.sort(key=lambda q: q.order_num)
    return ExamResponse.model_validate(exam)


@router.post("/submit", response_model=ExamResultResponse, status_code=201)
async def submit_exam(
    data: ExamSubmit,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Verify exam exists
    exam_result = await db.execute(
        select(MockExam)
        .options(selectinload(MockExam.questions))
        .where(MockExam.id == data.exam_id)
    )
    exam = exam_result.scalar_one_or_none()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    # Build answer map: question_id -> correct_answer
    correct_map = {q.id: q.correct_answer for q in exam.questions}
    total_questions = len(exam.questions)

    # Grade answers
    correct_count = 0
    answer_details = []
    for ans in data.answers:
        is_correct = correct_map.get(ans.question_id, "").strip().lower() == ans.answer.strip().lower()
        if is_correct:
            correct_count += 1
        answer_details.append({
            "question_id": ans.question_id,
            "given_answer": ans.answer,
            "correct_answer": correct_map.get(ans.question_id, ""),
            "is_correct": is_correct,
        })

    # Calculate IELTS-style band score (rough mapping)
    percentage = (correct_count / total_questions * 100) if total_questions > 0 else 0
    if percentage >= 90: band = 9.0
    elif percentage >= 80: band = 8.0
    elif percentage >= 70: band = 7.0
    elif percentage >= 60: band = 6.5
    elif percentage >= 50: band = 6.0
    elif percentage >= 40: band = 5.5
    elif percentage >= 30: band = 5.0
    else: band = 4.0

    result = ExamResult(
        user_id=current_user.id,
        exam_id=data.exam_id,
        score=band,
        total_questions=total_questions,
        correct_answers=correct_count,
        time_spent=data.time_spent,
        answers=answer_details,
    )
    db.add(result)
    await db.flush()

    # Update gamification
    await add_xp_and_update(db, current_user.id, XP_PER_EXAM, "exam")

    return ExamResultResponse.model_validate(result)


@router.get("/results/history", response_model=List[ExamResultResponse])
async def get_exam_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ExamResult)
        .where(ExamResult.user_id == current_user.id)
        .order_by(ExamResult.created_at.desc())
        .limit(50)
    )
    results = result.scalars().all()
    return [ExamResultResponse.model_validate(r) for r in results]
