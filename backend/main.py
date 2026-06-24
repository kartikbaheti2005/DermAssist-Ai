from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from core.config import (
    APP_NAME,
    FRONTEND_URL,
)

from core.startup import create_tables

# =====================================================
# Routers
# =====================================================

from routers.auth import router as auth_router
from routers.admin import router as admin_router
from routers.doctor import router as doctor_router
from routers.appointment import router as appointment_router
from routers.prediction import router as prediction_router
from routers.health_record import (
    router as health_record_router
)
from routers.image import router as image_router
from routers.chatbot import router as chatbot_router
from routers.outbreak import router as outbreak_router
from routers.report import router as report_router
from routers.recommendation import (
    router as recommendation_router
)

# =====================================================
# App
# =====================================================

app = FastAPI(
    title=APP_NAME,
    version="3.0.0",
)

# =====================================================
# Startup
# =====================================================

@app.on_event("startup")
def startup_event():
    create_tables()

# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Uploads
# =====================================================

UPLOAD_DIR = Path("uploads")

UPLOAD_DIR.mkdir(
    exist_ok=True
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# =====================================================
# Health
# =====================================================

@app.get("/")
def root():
    return {
        "message":
            "DermAssist AI Backend Running",
        "version":
            "3.0.0",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "DermAssist AI",
    }

# =====================================================
# Router Registration
# =====================================================

app.include_router(auth_router)

app.include_router(admin_router)

app.include_router(doctor_router)

app.include_router(
    appointment_router
)

app.include_router(
    prediction_router
)

app.include_router(
    health_record_router
)

app.include_router(
    image_router
)

app.include_router(
    chatbot_router
)

app.include_router(
    outbreak_router
)

app.include_router(
    report_router
)

app.include_router(
    recommendation_router
)