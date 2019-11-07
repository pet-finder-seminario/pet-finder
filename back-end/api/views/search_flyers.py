from flask import Blueprint, request
from api.models import db, SearchFlyer, AdoptionFlyer, Message
from api.core import create_response, serialize_list, logger
from sqlalchemy import inspect

blueprint = Blueprint("search_flyers", __name__)

'''
Docs: https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/#queries-in-views
'''

@blueprint.route("/search_flyers", methods=["GET"])
def get_flyers():
    flyers = SearchFlyer.query.all()
    return create_response(data={"flyers": serialize_list(flyers)})

@blueprint.route("/search_flyers/<flyer_id>", methods=["GET"])
def get_flyer(flyer_id):
    flyer = SearchFlyer.query.get(flyer_id)
    return create_response(data={"flyer": flyer.to_dict()})

@blueprint.route("/search_flyers", methods=["POST"])
def create_flyer():
    data = request.get_json()
    logger.info("Data recieved: %s", data)

    if "pet_type" not in data:
        msg = "No pet_type provided for flyer."
        logger.info(msg)
        return create_response(status=422, message=msg)
    if "flyer_type" not in data:
        msg = "No flyer_type provided for flyer."
        logger.info(msg)
        return create_response(status=422, message=msg)

    # create SQLAlchemy Object
    new_flyer = SearchFlyer(**data)

    # commit it to database
    db.session.add_all([new_flyer])
    db.session.commit()
    return create_response(
        message=f"Successfully created search flyer with id: {new_flyer.id}",
        data={ "flyer": new_flyer.to_dict() }
    )

@blueprint.route("/search_flyers/<flyer_id>/replies", methods=["POST"])
def get_replies(flyer_id):
    data = request.get_json()
    logger.info("Data recieved: %s", data)

    if "sender" not in data:
        msg = "No sender provided for reply."
        logger.info(msg)
        return create_response(status=422, message=msg)
    
    flyer = SearchFlyer.query.get(flyer_id)
    sender = data['sender']
    data['content'] = f'{sender} se quiere contactar con vos por tu aviso.'
    data['flyer_id'] = flyer_id
    data['recipient'] = flyer.created_by
    data['status'] = 'sent'

    # create SQLAlchemy Object
    message = Message(**data)

    # commit it to database
    db.session.add_all([message])
    db.session.commit()
    return create_response(
        message=f"Successfully created message with id: {message.id}",
        data={ "message": message.to_dict() }
    )

@blueprint.route("/search_flyers/<flyer_id>/replies", methods=["GET"])
def post_reply(flyer_id):
    messages = Message.query.all()
    return create_response(data={"messages": serialize_list(messages)})

