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



# =====================================================
# App
# =====================================================

APP_NAME = os.getenv(
    "APP_NAME",
    "DermAssist AI"
)

# =====================================================
# Development Defaults
# =====================================================

DEV_FRONTEND_URLS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# =====================================================
# Frontend Origins
# =====================================================

FRONTEND_URLS = os.getenv("FRONTEND_URLS")

if FRONTEND_URLS:
    FRONTEND_URLS = [
        url.strip()
        for url in FRONTEND_URLS.split(",")
    ]
else:
    FRONTEND_URLS = DEV_FRONTEND_URLS

# ==========================
# AI Services
# ==========================

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "groq").strip().lower()
LLM_MODEL = os.getenv("LLM_MODEL", "").strip()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


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
    str(BASE_DIR / "ml_models" / "weights" / "dermassist_b0_v1.pth")
)

MODEL_VERSION = os.getenv(
    "MODEL_VERSION",
    "dermassist-b0-v1"
)

MODEL_THRESHOLD = float(os.getenv(
    "MODEL_THRESHOLD",
    "0.50"
))

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