from datetime import datetime
from zoneinfo import ZoneInfo

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


IST = ZoneInfo("Asia/Kolkata")


def ist_now():
    """
    Returns current IST time.
    Used as default timestamp for all database tables.
    """
    return datetime.now(IST)