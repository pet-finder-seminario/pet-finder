from flask import Blueprint, request
from api.models import db, SearchFlyer, AdoptionFlyer, Message
from api.core import create_response, serialize_list, logger
from sqlalchemy import inspect
from google.cloud import storage
import os

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

@blueprint.route('/upload_image', methods=['POST'])
def upload_image():
    """Process the uploaded file and upload it to Google Cloud Storage."""
    uploaded_file = request.files.get('photoURI')

    if not uploaded_file:
        return 'No file uploaded.', 400

    # Create a Cloud Storage client.
    gcs = storage.Client()

    CLOUD_STORAGE_BUCKET = os.environ['CLOUD_STORAGE_BUCKET']

    # Get the bucket that the file will be uploaded to.
    bucket = gcs.get_bucket(CLOUD_STORAGE_BUCKET)

    # Create a new blob and upload the file's content.
    blob = bucket.blob(uploaded_file.filename)

    blob.upload_from_string(
        uploaded_file.read(),
        content_type=uploaded_file.content_type
    )

    # The public URL can be used to directly access the uploaded file via HTTP.
    return create_response(
        message=f"Successfully uploaded image",
        data={ "photo_url": blob.public_url }
    )
