# IELTS Preparation Platform — Full Setup Guide

## 📋 Overview

A full-stack web application for IELTS preparation featuring AI-powered writing feedback, mock exams (reading/listening), gamification (XP, levels, streaks, badges), and a progress dashboard.

**Tech Stack:**
- Frontend: Angular 17 (standalone components, Angular Material)
- Backend: FastAPI (Python 3.12, async)
- Database: PostgreSQL 16 (with pgAdmin 4)
- AI: OpenAI API (gpt-4o-mini) with mock fallback
- Containerization: Docker Compose

---

## 🗂 Project Structure

```
ielts-platform/
├── docker-compose.yml          # Orchestrates all 4 services
├── .env                        # Environment variables (DB creds, API keys)
│
├── db/
│   └── init.sql                # Database schema + seed data (auto-runs on first start)
│
├── backend/                    # FastAPI application
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── __init__.py
│       ├── main.py             # FastAPI app entry point, CORS, router registration
│       ├── config.py           # Pydantic Settings (reads .env)
│       ├── database.py         # Async SQLAlchemy engine + session
│       ├── models/
│       │   ├── __init__.py
│       │   └── models.py       # All SQLAlchemy ORM models (User, Writing, Exam, Gamification)
│       ├── schemas/
│       │   ├── __init__.py
│       │   └── schemas.py      # All Pydantic request/response schemas
│       ├── routers/
│       │   ├── __init__.py
│       │   ├── auth.py         # POST /api/auth/register, /api/auth/login
│       │   ├── users.py        # GET/PUT /api/users/me
│       │   ├── writing.py      # POST /api/writing/submit, GET /api/writing/history
│       │   ├── exams.py        # GET /api/exams, POST /api/exams/submit
│       │   ├── gamification.py # GET /api/gamification/progress, /badges
│       │   └── dashboard.py    # GET /api/dashboard (aggregated view)
│       ├── services/
│       │   ├── __init__.py
│       │   ├── auth_service.py       # JWT creation, password hashing, get_current_user
│       │   ├── ai_service.py         # OpenAI integration with mock fallback
│       │   └── gamification_service.py # XP, streaks, levels, badge checking
│       └── utils/
│           └── __init__.py
│
└── frontend/                   # Angular 17 application
    ├── Dockerfile
    ├── package.json
    ├── angular.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── proxy.conf.json         # Dev proxy: /api → backend:8000
    └── src/
        ├── main.ts             # Angular bootstrap
        ├── index.html
        ├── styles.scss          # Global styles, CSS variables, utilities
        └── app/
            ├── app.component.ts # Root layout (sidebar + navbar + router-outlet)
            ├── app.config.ts    # Providers (router, HTTP, animations)
            ├── app.routes.ts    # Lazy-loaded route definitions
            ├── core/
            │   ├── services/
            │   │   ├── auth.service.ts  # JWT storage, login/register/logout, user signal
            │   │   └── api.service.ts   # All HTTP calls to backend
            │   ├── guards/
            │   │   └── auth.guard.ts    # Route protection
            │   └── interceptors/
            │       └── auth.interceptor.ts # Attaches Bearer token to requests
            ├── features/
            │   ├── auth/
            │   │   ├── login/login.component.ts
            │   │   └── register/register.component.ts
            │   ├── dashboard/dashboard.component.ts    # Stats, XP bar, band chart, badges
            │   ├── writing/
            │   │   ├── writing.component.ts             # Submit essays, view history
            │   │   └── submission-detail/submission-detail.component.ts
            │   ├── exams/
            │   │   ├── exam-list/exam-list.component.ts # Browse mock exams
            │   │   └── exam-take/exam-take.component.ts # Take exam with timer
            │   └── profile/profile.component.ts         # Edit profile, view stats
            └── shared/
                └── components/
                    ├── navbar/navbar.component.ts
                    └── sidebar/sidebar.component.ts
```

---

## 🚀 Step-by-Step Setup

### Prerequisites

Install these on your machine:
- **Docker Desktop** (includes Docker Compose): https://www.docker.com/products/docker-desktop/
- **Node.js 20+** (for local Angular dev): https://nodejs.org/
- **Git** (optional, for version control)

### Step 1: Create the Project Folder

```bash
mkdir ielts-platform
cd ielts-platform
```

### Step 2: Copy All Files

Copy every file from this guide into the exact paths shown in the project structure above. The key files are:

1. `docker-compose.yml` — in root
2. `.env` — in root
3. `db/init.sql` — database schema and seeds
4. `backend/` — entire folder with all Python files
5. `frontend/` — entire folder with all Angular files

### Step 3: Configure Environment Variables

Edit `.env` in the root folder:

```env
# Database
POSTGRES_USER=ielts_user
POSTGRES_PASSWORD=ielts_pass
POSTGRES_DB=ielts_db

# pgAdmin
PGADMIN_EMAIL=admin@ielts.com
PGADMIN_PASSWORD=admin

# Backend
SECRET_KEY=supersecretkey123change_this_in_production
OPENAI_API_KEY=sk-your-openai-api-key-here

# CORS
CORS_ORIGINS=http://localhost:4200,http://localhost
```

**Important:** If you have an OpenAI API key, put it in `OPENAI_API_KEY`. If you don't, the app will use mock AI feedback automatically — everything still works.

### Step 4: Start Everything with Docker

```bash
docker compose up --build
```

This builds and starts 4 containers:
- **db** (PostgreSQL) → port 5432
- **pgadmin** (pgAdmin 4) → port 5050
- **backend** (FastAPI) → port 8000
- **frontend** (Angular) → port 4200

First run takes 3-5 minutes to download images and install dependencies.

### Step 5: Verify Everything Works

| Service | URL | What to Check |
|---------|-----|---------------|
| Frontend | http://localhost:4200 | Should show login page |
| Backend API Docs | http://localhost:8000/docs | Interactive Swagger UI |
| Backend Health | http://localhost:8000/api/health | Should return `{"status": "ok"}` |
| pgAdmin | http://localhost:5050 | Login with admin@ielts.com / admin |

### Step 6: Connect pgAdmin to the Database

1. Open http://localhost:5050
2. Login: `admin@ielts.com` / `admin`
3. Right-click "Servers" → "Register" → "Server"
4. **General tab**: Name = `IELTS DB`
5. **Connection tab**:
   - Host: `db` (Docker container name)
   - Port: `5432`
   - Username: `ielts_user`
   - Password: `ielts_pass`
6. Save → you can browse all tables

---

## 🗄 Database Schema (ER Diagram)

```
┌──────────────┐     ┌───────────────────┐     ┌──────────────┐
│    users      │────▶│ writing_submissions│────▶│  ai_feedback  │
│──────────────│     │───────────────────│     │──────────────│
│ id (PK)      │     │ id (PK)           │     │ id (PK)      │
│ email        │     │ user_id (FK)      │     │ submission_id │
│ username     │     │ task_type         │     │ overall_band  │
│ hashed_pass  │     │ prompt            │     │ task_achieve. │
│ full_name    │     │ essay             │     │ coherence     │
│ target_band  │     │ word_count        │     │ lexical_res.  │
│ created_at   │     │ created_at        │     │ grammar_acc.  │
└──────┬───────┘     └───────────────────┘     │ feedback_text │
       │                                        │ suggestions   │
       │                                        │ strengths     │
       │                                        └──────────────┘
       │
       │     ┌──────────────┐     ┌──────────────────┐
       ├────▶│ exam_results  │────▶│   mock_exams      │
       │     │──────────────│     │──────────────────│
       │     │ id (PK)      │     │ id (PK)          │
       │     │ user_id (FK) │     │ exam_type        │
       │     │ exam_id (FK) │     │ title            │
       │     │ score        │     │ description      │
       │     │ correct_ans  │     │ time_limit       │
       │     │ time_spent   │     │ difficulty       │
       │     │ answers      │     └────────┬─────────┘
       │     └──────────────┘              │
       │                          ┌────────▼─────────┐
       │                          │  exam_questions   │
       │                          │──────────────────│
       │                          │ id (PK)          │
       │                          │ exam_id (FK)     │
       │                          │ question_text    │
       │                          │ question_type    │
       │                          │ options (JSONB)  │
       │                          │ correct_answer   │
       │                          │ passage_text     │
       │                          └──────────────────┘
       │
       │     ┌──────────────┐
       ├────▶│ user_progress │    (Gamification)
       │     │──────────────│
       │     │ user_id (FK) │
       │     │ level        │
       │     │ xp           │
       │     │ current_streak│
       │     │ longest_streak│
       │     │ total_writings│
       │     │ total_exams  │
       │     └──────────────┘
       │
       │     ┌──────────────┐     ┌──────────────┐
       └────▶│ user_badges   │────▶│   badges      │
             │──────────────│     │──────────────│
             │ user_id (FK) │     │ id (PK)      │
             │ badge_id (FK)│     │ name         │
             │ earned_at    │     │ description  │
             └──────────────┘     │ icon         │
                                  │ req_type     │
                                  │ req_value    │
                                  └──────────────┘
```

---

## 🔌 API Endpoints Summary

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user → returns JWT |
| POST | `/api/auth/login` | Login → returns JWT |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user profile |
| PUT | `/api/users/me` | Update name, target band |

### Writing (AI Feedback)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/writing/submit` | Submit essay → AI feedback + XP |
| GET | `/api/writing/history` | Get all past submissions |
| GET | `/api/writing/{id}` | Get single submission with feedback |

### Mock Exams
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/exams/` | List all mock exams |
| GET | `/api/exams/{id}` | Get exam with questions |
| POST | `/api/exams/submit` | Submit answers → score + XP |
| GET | `/api/exams/results/history` | Past exam results |

### Gamification
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gamification/progress` | Level, XP, streak, totals |
| GET | `/api/gamification/badges` | All badges with earned status |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/` | Aggregated: stats, recent activity, band chart data |

---

## 🎮 How Features Work

### Authentication Flow
1. User registers → password hashed with bcrypt → stored in DB
2. JWT token created with user ID → returned to frontend
3. Frontend stores token in localStorage
4. Every API request attaches `Authorization: Bearer <token>` via interceptor
5. Backend decodes token → identifies user → proceeds

### Writing + AI Feedback Flow
1. User types essay on `/writing` page
2. Frontend sends POST to `/api/writing/submit`
3. Backend saves submission → calls OpenAI API (or mock fallback)
4. AI returns band scores (Task Achievement, Coherence, Lexical, Grammar) + feedback text
5. Feedback saved to `ai_feedback` table
6. Gamification: +25 XP, streak updated, badges checked
7. Full result returned to frontend → displayed with band bars

### Gamification System
- **XP**: +25 per writing, +15 per exam, +5 per streak day
- **Levels**: Level N requires N × 100 XP (Level 1=100, Level 2=200, etc.)
- **Streaks**: Consecutive days of activity. Resets if you skip a day.
- **Badges**: Auto-awarded when conditions met (e.g., 7-day streak, 10 writings)

### Mock Exam Flow
1. User browses exams on `/exams`
2. Clicks "Start Exam" → loads questions with countdown timer
3. Answers questions (multiple choice, true/false/not given)
4. Submits → backend grades against correct answers
5. IELTS-style band score calculated from percentage
6. Results displayed with correct/wrong review

---

## ⚙ Development Workflow

### Running Without Docker (Local Dev)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Set environment variables or create .env in backend/
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
ng serve --proxy-config proxy.conf.json
```

**Database (needs Docker or local PostgreSQL):**
```bash
docker run -d --name ielts_pg -e POSTGRES_USER=ielts_user \
  -e POSTGRES_PASSWORD=ielts_pass -e POSTGRES_DB=ielts_db \
  -p 5432:5432 -v $(pwd)/db/init.sql:/docker-entrypoint-initdb.d/init.sql \
  postgres:16-alpine
```

### Stopping Docker
```bash
docker compose down          # Stop containers
docker compose down -v       # Stop + delete database volume (full reset)
```

### Rebuilding After Code Changes
```bash
docker compose up --build    # Rebuilds images with latest code
```

---

## 🔑 Key Architecture Decisions

| Decision | Why |
|----------|-----|
| FastAPI over Django | Async-native, lightweight, built-in OpenAPI docs, perfect for REST APIs |
| SQLAlchemy async | Non-blocking DB queries, pairs with FastAPI's async nature |
| Angular standalone components | No NgModules needed, cleaner code, better tree-shaking |
| JWT in localStorage | Simple auth for MVP; upgrade to httpOnly cookies for production |
| OpenAI gpt-4o-mini | Cost-effective, fast, good enough for IELTS feedback |
| Mock AI fallback | App works without OpenAI key → easier development and testing |
| Docker Compose | One command starts everything; consistent across machines |
| PostgreSQL JSONB | Flexible storage for exam answers and options without extra tables |

---

## 🔧 Adding Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create a new key
3. Add it to `.env`: `OPENAI_API_KEY=sk-...`
4. Restart: `docker compose restart backend`

Without the key, the app uses realistic mock feedback — all features work identically.

---

## 📝 What Each File Does (Quick Reference)

### Backend
| File | Purpose |
|------|---------|
| `main.py` | Creates FastAPI app, adds CORS middleware, registers all routers |
| `config.py` | Reads environment variables with validation |
| `database.py` | Creates async DB engine and session factory |
| `models/models.py` | 9 SQLAlchemy models mapping to DB tables |
| `schemas/schemas.py` | Pydantic models for request validation and response serialization |
| `services/auth_service.py` | Password hashing (bcrypt), JWT creation/verification |
| `services/ai_service.py` | Calls OpenAI for essay evaluation, falls back to mock data |
| `services/gamification_service.py` | XP calculation, streak management, badge checking |
| `routers/auth.py` | Register and login endpoints |
| `routers/writing.py` | Essay submission with AI feedback pipeline |
| `routers/exams.py` | Exam CRUD and answer grading |
| `routers/dashboard.py` | Aggregates all user data for dashboard view |

### Frontend
| File | Purpose |
|------|---------|
| `app.component.ts` | Layout shell: sidebar + navbar + router outlet |
| `app.routes.ts` | Defines all routes with lazy loading and auth guard |
| `auth.service.ts` | Manages JWT token, user state, login/logout |
| `api.service.ts` | All HTTP calls to the backend (centralized) |
| `auth.guard.ts` | Redirects unauthenticated users to login |
| `auth.interceptor.ts` | Attaches JWT to every outgoing HTTP request |
| `login.component.ts` | Login form with validation |
| `register.component.ts` | Registration form with target band selection |
| `dashboard.component.ts` | Main page: stats cards, XP bar, band chart, badges |
| `writing.component.ts` | Essay submission form + writing history table |
| `submission-detail.component.ts` | Full view of a single submission with AI feedback |
| `exam-list.component.ts` | Browse exams with type filter + past results |
| `exam-take.component.ts` | Take an exam with countdown timer + result review |
| `profile.component.ts` | Edit name/target band, view stats and badges |

---

## ✅ MVP Feature Checklist

- [x] User registration and authentication (JWT)
- [x] User profile management
- [x] Writing submission with AI-powered IELTS feedback
- [x] Band scores across 4 IELTS criteria
- [x] Writing history with detailed feedback view
- [x] Mock reading exams with passage + questions
- [x] Exam grading with IELTS band score mapping
- [x] Gamification: XP, levels, streaks
- [x] Badge system with 10 predefined badges
- [x] Progress dashboard with band score chart
- [x] Docker Compose for one-command deployment
- [x] pgAdmin 4 for database management
- [x] OpenAI integration with mock fallback
