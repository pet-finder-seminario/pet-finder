from flask import Blueprint

blueprint = Blueprint("status", __name__)

@blueprint.route("/status")
def status():
    # you are now in the current application context with the main.route decorator
    # access the logger with the logger from api.core and uses the standard logging module
    # try using ipdb here :) you can inject yourself
    return "Up and running!"
