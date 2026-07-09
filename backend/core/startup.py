from database.database import engine

from models.base import Base

# Import all models
                                                                   
from models.user import User
from models.doctor import Doctor
from models.image import Image
from models.prediction import Prediction
from models.appointment import Appointment
from models.health_record import HealthRecord


def create_tables():
    Base.metadata.create_all(
        bind=engine
    )