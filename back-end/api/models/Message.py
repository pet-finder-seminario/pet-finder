from api.core import Mixin
from .base import db


class Message(Mixin, db.Model):
    """Message Table."""

    __tablename__ = "messages"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    sender = db.Column(db.String, nullable=False)
    recipient = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=True)
    content = db.Column(db.String, nullable=False)
    flyer_id = db.Column(
        db.Integer, db.ForeignKey("flyers.id", ondelete="SET NULL"), nullable=True
    )
    status = db.Column(db.String, nullable=True)

    def __repr__(self):
        return f"<Reply {self.created_by}>"
