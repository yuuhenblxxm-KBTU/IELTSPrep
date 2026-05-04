from sqlalchemy import (
    Column, Integer, String, Text, Numeric, Date,
    ForeignKey, DateTime, UniqueConstraint, CheckConstraint
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(100), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(200))
    target_band = Column(Numeric(2, 1), default=7.0)
    avatar_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    submissions = relationship("WritingSubmission", back_populates="user", cascade="all, delete-orphan")
    exam_results = relationship("ExamResult", back_populates="user", cascade="all, delete-orphan")
    progress = relationship("UserProgress", back_populates="user", uselist=False, cascade="all, delete-orphan")
    badges = relationship("UserBadge", back_populates="user", cascade="all, delete-orphan")



class WritingSubmission(Base):
    __tablename__ = "writing_submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    task_type = Column(String(10), nullable=False)
    prompt = Column(Text)
    essay = Column(Text, nullable=False)
    word_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="submissions")
    feedback = relationship("AIFeedback", back_populates="submission", uselist=False, cascade="all, delete-orphan")


class AIFeedback(Base):
    __tablename__ = "ai_feedback"

    id = Column(Integer, primary_key=True, index=True)
    submission_id = Column(Integer, ForeignKey("writing_submissions.id", ondelete="CASCADE"), nullable=False)
    overall_band = Column(Numeric(2, 1))
    task_achievement = Column(Numeric(2, 1))
    coherence_cohesion = Column(Numeric(2, 1))
    lexical_resource = Column(Numeric(2, 1))
    grammar_accuracy = Column(Numeric(2, 1))
    feedback_text = Column(Text)
    suggestions = Column(Text)
    strengths = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    submission = relationship("WritingSubmission", back_populates="feedback")



class MockExam(Base):
    __tablename__ = "mock_exams"

    id = Column(Integer, primary_key=True, index=True)
    exam_type = Column(String(20), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    time_limit = Column(Integer, default=60)
    difficulty = Column(String(20), default="intermediate")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    questions = relationship("ExamQuestion", back_populates="exam", cascade="all, delete-orphan")
    results = relationship("ExamResult", back_populates="exam", cascade="all, delete-orphan")


class ExamQuestion(Base):
    __tablename__ = "exam_questions"

    id = Column(Integer, primary_key=True, index=True)
    exam_id = Column(Integer, ForeignKey("mock_exams.id", ondelete="CASCADE"), nullable=False)
    question_text = Column(Text, nullable=False)
    question_type = Column(String(50), nullable=False)
    options = Column(JSONB)
    correct_answer = Column(String(500), nullable=False)
    passage_text = Column(Text)
    audio_url = Column(String(500))
    order_num = Column(Integer, default=0)

    exam = relationship("MockExam", back_populates="questions")


class ExamResult(Base):
    __tablename__ = "exam_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    exam_id = Column(Integer, ForeignKey("mock_exams.id", ondelete="CASCADE"), nullable=False)
    score = Column(Numeric(4, 1))
    total_questions = Column(Integer)
    correct_answers = Column(Integer)
    time_spent = Column(Integer, default=0)
    answers = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="exam_results")
    exam = relationship("MockExam", back_populates="results")



class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    current_streak = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    last_activity_date = Column(Date)
    total_writings = Column(Integer, default=0)
    total_exams = Column(Integer, default=0)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="progress")


class Badge(Base):
    __tablename__ = "badges"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    icon = Column(String(100), default="star")
    requirement_type = Column(String(50), nullable=False)
    requirement_value = Column(Integer, nullable=False)

    user_badges = relationship("UserBadge", back_populates="badge")


class UserBadge(Base):
    __tablename__ = "user_badges"
    __table_args__ = (UniqueConstraint("user_id", "badge_id"),)

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    badge_id = Column(Integer, ForeignKey("badges.id", ondelete="CASCADE"), nullable=False)
    earned_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="badges")
    badge = relationship("Badge", back_populates="user_badges")
