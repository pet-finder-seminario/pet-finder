from api.core import Mixin

from .Flyer import Flyer
from .base import db

class AdoptionFlyer(Flyer):
    """ AdoptionFlyer """

    __tablename__ = "adoption_flyers"
    __mapper_args__ = {'polymorphic_identity': 'adoption_flyer'}

    id = db.Column(db.Integer, db.ForeignKey('flyers.id'), primary_key=True)
    castrated = db.Column(db.Boolean, default=False)
    vaccinated = db.Column(db.Boolean, default=False)
    dewormed = db.Column(db.Boolean, default=False)
    contact_phone_number = db.Column(db.String, nullable=True)