from api.core import Mixin
import enum
import datetime

from .Flyer import Flyer
from .base import db
from .helpers import IntEnum

class FlyerType(enum.IntEnum):
    lost = 1
    found = 2

class SearchFlyer(Flyer):
    """ SearchFlyer """

    __tablename__ = "search_flyers"

    id = db.Column(db.Integer, db.ForeignKey('flyers.id'), primary_key=True)
    longitude = db.Column(db.Float, nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    flyer_type = db.Column(IntEnum(FlyerType), default=FlyerType.lost)