from api.core import Mixin
from .base import db
import enum


class PetTypes(enum.IntEnum):
    dog = 1
    cat = 2


class FlyerType(enum.IntEnum):
    lost = 1
    found = 2


class IntEnum(db.TypeDecorator):
    """
    Enables passing in a Python enum and storing the enum's *value* in the db.
    The default would have stored the enum's *name* (ie the string).
    """
    impl = db.Integer

    def __init__(self, enumtype, *args, **kwargs):
        super(IntEnum, self).__init__(*args, **kwargs)
        self._enumtype = enumtype

    def process_bind_param(self, value, dialect):
        if isinstance(value, int):
            return value

        return value.value

    def process_result_value(self, value, dialect):
        return self._enumtype(value)


class Flyer(Mixin, db.Model):
    """Flyer Table."""

    __tablename__ = "flyers"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    created_by = db.Column(db.String, nullable=False)
    pet_name = db.Column(db.String, nullable=True)
    pet_type = db.Column(IntEnum(PetTypes), default=PetTypes.dog)
    flyer_type = db.Column(IntEnum(FlyerType), default=FlyerType.lost)
    photo = db.Column(db.String, nullable=False)  # Photo URL
    description = db.Column(db.String, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    replies = db.relationship("Reply", backref="replies")

    def __repr__(self):
        return f"<Flyer {self.name if self.name else self.id}>"
