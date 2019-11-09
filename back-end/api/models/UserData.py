from api.core import Mixin
import datetime

from .base import db

class UserData(Mixin, db.Model):
    """UserData Table."""

    __tablename__ = "user_data"

    email = db.Column(db.String, unique=True, primary_key=True)
    push_token = db.Column(db.String, nullable=True)
    phone_number = db.Column(db.String, nullable=True)

    def __repr__(self):
        return f"<UserData {self.email}>"
