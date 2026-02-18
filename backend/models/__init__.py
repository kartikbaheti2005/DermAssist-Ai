from datetime import datetime
import pytz
from database import Base

ist = pytz.timezone("Asia/Kolkata")

def ist_now():
    return datetime.now(ist).isoformat()

from .base import Base, ist_now
from .user import User
from .images import Image
from .prediciton import Prediction