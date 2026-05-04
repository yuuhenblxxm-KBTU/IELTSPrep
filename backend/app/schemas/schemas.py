from pydantic import BaseModel, Field
from typing import Optional, List, Any
from datetime import datetime, date
from decimal import Decimal


class UserCreate(BaseModel):
    email: str
    username: str = Field(min_length=3, max_length=100)
    password: str = Field(min_length=6)
    full_name: Optional[str] = None
    target_band: Optional[float] = 7.0


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str] = None
    target_band: Optional[float] = None
    avatar_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=100)
    full_name: Optional[str] = None
    target_band: Optional[float] = None
    avatar_url: Optional[str] = None


class PasswordChange(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse



class WritingSubmit(BaseModel):
    task_type: str = Field(pattern="^(task1|task2)$")
    prompt: Optional[str] = None
    essay: str = Field(min_length=10)


class FeedbackResponse(BaseModel):
    id: int
    overall_band: Optional[float]
    task_achievement: Optional[float]
    coherence_cohesion: Optional[float]
    lexical_resource: Optional[float]
    grammar_accuracy: Optional[float]
    feedback_text: Optional[str]
    suggestions: Optional[str]
    strengths: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class WritingResponse(BaseModel):
    id: int
    user_id: int
    task_type: str
    prompt: Optional[str]
    essay: str
    word_count: int
    feedback: Optional[FeedbackResponse] = None
    created_at: datetime

    class Config:
        from_attributes = True



class QuestionResponse(BaseModel):
    id: int
    question_text: str
    question_type: str
    options: Optional[Any]
    passage_text: Optional[str]
    audio_url: Optional[str]
    order_num: int

    class Config:
        from_attributes = True


class ExamResponse(BaseModel):
    id: int
    exam_type: str
    title: str
    description: Optional[str]
    time_limit: int
    difficulty: str
    questions: List[QuestionResponse] = []
    created_at: datetime

    class Config:
        from_attributes = True


class ExamListItem(BaseModel):
    id: int
    exam_type: str
    title: str
    description: Optional[str]
    time_limit: int
    difficulty: str
    question_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


class AnswerSubmit(BaseModel):
    question_id: int
    answer: str


class ExamSubmit(BaseModel):
    exam_id: int
    answers: List[AnswerSubmit]
    time_spent: int = 0


class ExamResultResponse(BaseModel):
    id: int
    exam_id: int
    score: Optional[float]
    total_questions: int
    correct_answers: int
    time_spent: int
    answers: Optional[Any]
    created_at: datetime

    class Config:
        from_attributes = True



class ProgressResponse(BaseModel):
    level: int
    xp: int
    xp_to_next_level: int
    current_streak: int
    longest_streak: int
    last_activity_date: Optional[date]
    total_writings: int
    total_exams: int

    class Config:
        from_attributes = True


class BadgeResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    icon: str
    earned: bool = False
    earned_at: Optional[datetime] = None

    class Config:
        from_attributes = True



class DashboardResponse(BaseModel):
    user: UserResponse
    progress: Optional[ProgressResponse]
    recent_writings: List[WritingResponse]
    recent_results: List[ExamResultResponse]
    badges: List[BadgeResponse]
    writing_band_history: List[dict]