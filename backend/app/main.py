from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.routers import auth, users, writing, exams, gamification, dashboard

settings = get_settings()

app = FastAPI(
    title="IELTS Preparation Platform API",
    description="AI-powered IELTS preparation with gamification",
    version="1.0.0",
)

# CORS
origins = [o.strip() for o in settings.CORS_ORIGINS.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(writing.router)
app.include_router(exams.router)
app.include_router(gamification.router)
app.include_router(dashboard.router)


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "IELTS Platform API"}
