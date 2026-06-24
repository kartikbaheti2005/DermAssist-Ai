from pathlib import Path
from dotenv import load_dotenv
import os


BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# ==========================
# Application
# ==========================

APP_NAME = "DermAssist AI"

DEBUG = os.getenv(
    "DEBUG",
    "False"
).lower() == "true"


# ==========================
# Database
# ==========================

DATABASE_URL = os.getenv(
    "DATABASE_URL"
)


# ==========================
# Security
# ==========================

SECRET_KEY = os.getenv(
    "SECRET_KEY"
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_HOURS = 24


# ==========================
# Email
# ==========================

EMAIL_USER = os.getenv(
    "EMAIL_USER"
)

EMAIL_PASSWORD = os.getenv(
    "EMAIL_PASSWORD"
)


# ==========================
# Frontend
# ==========================

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)


# ==========================
# AI Services
# ==========================

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)


# ==========================
# Uploads
# ==========================

UPLOAD_DIR = os.getenv(
    "UPLOAD_DIR",
    "uploads"
)


# ==========================
# ML Models
# ==========================

MODEL_PATH = os.getenv(
    "MODEL_PATH",
    "ml_models/best_model.pth"
)

STAGE2_MODEL_PATH = os.getenv(
    "STAGE2_MODEL_PATH",
    "ml_models/stage2_model.pth"
)

B3_MODEL_PATH = os.getenv(
    "B3_MODEL_PATH",
    "ml_models/b3_model.pth"
)

STAGE2_CLASSES_PATH = os.getenv(
    "STAGE2_CLASSES_PATH",
    "ml_models/stage2_classes.json"
)