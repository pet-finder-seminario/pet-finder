# this file structure follows http://flask.pocoo.org/docs/1.0/patterns/appfactories/
# initializing db in api.models.base instead of in api.__init__.py
# to prevent circular dependencies
from .SearchFlyer import SearchFlyer
from .AdoptionFlyer import AdoptionFlyer
from .Message import Message
from .UserData import UserData
from .base import db

__all__ = ["AdoptionFlyer", "SearchFlyer", "Message", "UserData", "db"]

# You must import all of the new Models you create to this page
