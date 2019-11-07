from flask import Blueprint, request
from api.core import create_response
from google.cloud import storage
import os

blueprint = Blueprint("image_views", __name__)

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
