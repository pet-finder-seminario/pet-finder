from api.core import Mixin
from .base import db


class Reply(Mixin, db.Model):
    """Reply Table."""

    __tablename__ = "replies"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    created_by = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=True)
    message = db.Column(db.String, nullable=False)
    flyer = db.Column(
        db.Integer, db.ForeignKey("flyers.id", ondelete="SET NULL"), nullable=True
    )

    def __repr__(self):
        return f"<Reply {self.created_by}>"
