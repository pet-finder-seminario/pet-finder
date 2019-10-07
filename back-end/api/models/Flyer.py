from api.core import Mixin
import enum
import datetime

from .base import db
from .helpers import IntEnum

class PetTypes(enum.IntEnum):
    dog = 1
    cat = 2

class Flyer(Mixin, db.Model):
    """Flyer Table."""

    __tablename__ = "flyers"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    created_by = db.Column(db.String, nullable=False)
    creation_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    expiration_date = db.Column(db.DateTime, nullable=True,  default=datetime.datetime.utcnow)
    pet_name = db.Column(db.String, nullable=True)
    pet_type = db.Column(IntEnum(PetTypes), default=PetTypes.dog)
    photo_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    breed = db.Column(db.String, nullable=True)
    replies = db.relationship("Message", backref="flyer", lazy=True)
    active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f"<Flyer {self.name if self.name else self.id}>"
