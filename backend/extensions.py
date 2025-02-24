# extensions.py

from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

# Initialize the extensions
db = SQLAlchemy()
jwt = JWTManager()
