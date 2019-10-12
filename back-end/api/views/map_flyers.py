from flask import Blueprint, request
from operator import itemgetter

from api.models import db, SearchFlyer, AdoptionFlyer, Message
from api.core import create_response, serialize_list, logger
from sqlalchemy import inspect

blueprint = Blueprint("map_flyers", __name__)

'''
Docs: https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/#queries-in-views
'''

@blueprint.route("/map_flyers", methods=["GET"])
def get_flyers_in_map():
    params = request.args.to_dict()
    flyers = []

    if params and params['top']:
        top, bottom, left, right = itemgetter('top', 'bottom', 'left', 'right')(params)
        flyers = SearchFlyer.query.filter(
            SearchFlyer.latitude <= top,
            SearchFlyer.latitude >= bottom,
            SearchFlyer.longitude <= right,
            SearchFlyer.longitude >= left,
        )
    else:
        flyers = SearchFlyer.query.all()

    return create_response(data={"flyers": serialize_list(flyers)})

@blueprint.route("/map_flyers/<flyer_id>", methods=["GET"])
def get_flyer(flyer_id):
    flyer = SearchFlyer.query.get(flyer_id)
    return create_response(data={"flyer": flyer.to_dict()})

