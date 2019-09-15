from flask import Blueprint, request, render_template
from api.models import db, Flyer, Reply
from api.core import create_response, serialize_list, logger
from sqlalchemy import inspect

main = Blueprint("main", __name__)  # initialize blueprint

# function that is called when you visit /
@main.route("/")
def index():
    # you are now in the current application context with the main.route decorator
    # access the logger with the logger from api.core and uses the standard logging module
    # try using ipdb here :) you can inject yourself
    logger.info("Hello World!")
    return render_template("home.html")


# function that is called when you visit /flyers
@main.route("/flyers", methods=["GET"])
def get_flyers():
    flyers = Flyer.query.all()
    return create_response(data={"flyers": serialize_list(flyers)})

# POST request for /flyers
@main.route("/flyers", methods=["POST"])
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
    new_flyer = Flyer(name=data["name"])

    # commit it to database
    db.session.add_all([new_flyer])
    db.session.commit()
    return create_response(
        message=f"Successfully created flyer {new_flyer.name} with id: {new_flyer._id}"
    )
