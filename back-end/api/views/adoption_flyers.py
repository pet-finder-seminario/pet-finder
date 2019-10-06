from flask import Blueprint, request
from api.models import db, AdoptionFlyer
from api.core import create_response, serialize_list, logger
from sqlalchemy import inspect

blueprint = Blueprint("adoption_flyers", __name__)

'''
Docs: https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/#queries-in-views
'''

@blueprint.route("/adoption_flyers", methods=["GET"])
def get_flyers():
    flyers = AdoptionFlyer.query.all()
    return create_response(data={"flyers": serialize_list(flyers)})

@blueprint.route("/adoption_flyers/<flyer_id>", methods=["GET"])
def get_flyer(flyer_id):
    flyer = AdoptionFlyer.query.get(flyer_id)
    return create_response(data={"flyer": flyer.to_dict()})

@blueprint.route("/adoption_flyers", methods=["POST"])
def create_flyer():
    data = request.get_json()

    logger.info("Data recieved: %s", data)

    # create SQLAlchemy Object
    new_flyer = AdoptionFlyer(**data)

    # commit it to database
    db.session.add_all([new_flyer])
    db.session.commit()
    return create_response(
        message=f"Successfully created adoption flyer with id: {new_flyer.id}",
        data={ "flyer": new_flyer.to_dict() }
    )
