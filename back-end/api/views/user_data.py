from flask import Blueprint, request
from operator import itemgetter

from api.models import db, UserData
from api.core import create_response, serialize_list, logger
from sqlalchemy import inspect

blueprint = Blueprint("user_data", __name__)

'''
Docs: https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/#queries-in-views
'''

@blueprint.route("/user_data", methods=["POST"])
def post_user_data():
    data = request.get_json()
    logger.info("Data recieved: %s", data)

    if "email" not in data:
        msg = "No email provided."
        logger.info(msg)
        return create_response(status=422, message=msg)
    
    user_data = UserData.query.filter(UserData.email == data['email'])
    
    if user_data:
        if data['push_token']:
            user_data.push_token = data['push_token']
        if data['phone_number']:
            user_data.phone_number = data['phone_number']
    else:
        user_data = UserData(**data)

    # commit it to database
    db.session.add_all([user_data])
    db.session.commit()
    return create_response(
        message=f"Successfully update user data with id: {user_data.id}",
        data={ "message": user_data.to_dict() }
    )
