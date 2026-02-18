from datetime import datetime, timedelta, date
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from pydantic import BaseModel
from typing import Optional

from database import SessionLocal
from models import User

# ─── Config ───────────────────────────────────────────────────────────────────
SECRET_KEY = "dermassist-secret-key-change-in-production"   # ⚠️ change before going live
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

router = APIRouter(prefix="/auth", tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# ─── DB Dependency ─────────────────────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ─── Pydantic Schemas ──────────────────────────────────────────────────────
class RegisterRequest(BaseModel):
    full_name: str
    username: str
    email: str
    password: str
    phone_number: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[str] = None  # sent as "YYYY-MM-DD" string from frontend

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

class UserOut(BaseModel):
    id: int
    full_name: str
    username: str
    email: str
    role: str
    is_active: bool


# ─── JWT Helpers ───────────────────────────────────────────────────────────
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user


# ─── Routes ───────────────────────────────────────────────────────────────
@router.post("/register", status_code=201)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    # Check duplicate email
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Email already registered.")

    # Check duplicate username
    if db.query(User).filter(User.username == payload.username).first():
        raise HTTPException(status_code=400, detail="Username already taken.")

    user = User(
        full_name=payload.full_name,
        username=payload.username,
        email=payload.email,
        phone_number=payload.phone_number,
        gender=payload.gender,
        date_of_birth=date.fromisoformat(payload.date_of_birth) if payload.date_of_birth else None,
    )
    user.set_password(payload.password)
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.username})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        }
    }


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Accept username OR email in the username field
    user = (
        db.query(User).filter(User.username == form_data.username).first() or
        db.query(User).filter(User.email == form_data.username).first()
    )

    if not user or not user.verify_password(form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is deactivated.")

    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()

    token = create_access_token({"sub": user.username})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        }
    }


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role,
        "is_active": current_user.is_active,
        "created_at": str(current_user.created_at),
    }