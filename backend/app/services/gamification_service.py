from datetime import date, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import UserProgress, Badge, UserBadge

XP_PER_WRITING = 25
XP_PER_EXAM = 15
XP_PER_STREAK_DAY = 5


def xp_for_level(level: int) -> int:
    return level * 100


async def get_or_create_progress(db: AsyncSession, user_id: int) -> UserProgress:
    result = await db.execute(
        select(UserProgress).where(UserProgress.user_id == user_id)
    )
    progress = result.scalar_one_or_none()
    if not progress:
        progress = UserProgress(user_id=user_id)
        db.add(progress)
        await db.flush()
    return progress


async def add_xp_and_update(db: AsyncSession, user_id: int, xp_amount: int, activity_type: str):
    progress = await get_or_create_progress(db, user_id)
    today = date.today()

    if progress.last_activity_date:
        diff = (today - progress.last_activity_date).days
        if diff == 1:
            progress.current_streak += 1
        elif diff > 1:
            progress.current_streak = 1
        # diff == 0 means same day, streak stays
    else:
        progress.current_streak = 1

    if progress.current_streak > progress.longest_streak:
        progress.longest_streak = progress.current_streak

    progress.last_activity_date = today
    progress.xp += xp_amount

    while progress.xp >= xp_for_level(progress.level + 1):
        progress.level += 1

    if activity_type == "writing":
        progress.total_writings += 1
    elif activity_type == "exam":
        progress.total_exams += 1

    await db.flush()
    await check_badges(db, user_id, progress)


async def check_badges(db: AsyncSession, user_id: int, progress: UserProgress):
    result = await db.execute(select(Badge))
    all_badges = result.scalars().all()

    earned_result = await db.execute(
        select(UserBadge.badge_id).where(UserBadge.user_id == user_id)
    )
    earned_ids = set(earned_result.scalars().all())

    for badge in all_badges:
        if badge.id in earned_ids:
            continue

        earned = False
        if badge.requirement_type == "writings" and progress.total_writings >= badge.requirement_value:
            earned = True
        elif badge.requirement_type == "streak" and progress.current_streak >= badge.requirement_value:
            earned = True
        elif badge.requirement_type == "level" and progress.level >= badge.requirement_value:
            earned = True
        elif badge.requirement_type == "exams" and progress.total_exams >= badge.requirement_value:
            earned = True

        if earned:
            db.add(UserBadge(user_id=user_id, badge_id=badge.id))

    await db.flush()
