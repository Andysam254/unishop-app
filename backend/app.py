from flask import Flask
from models import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///shop.db"
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'iygwhebkdsbxzjdshnvcbljhvsZJhxcbkwhhdvncbjfzxgk')  # Use environment variable
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

Migrate(app, db)


db.init_app(app)
jwt = JWTManager(app)


from views import *
app.register_blueprint(user_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(product_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(order_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(payment_bp)
app.register_blueprint(auth_bp)
