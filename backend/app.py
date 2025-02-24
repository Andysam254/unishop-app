# app.py
from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from flask_jwt_extended import JWTManager
from datetime import timedelta
# Import db and jwt from extensions.py
from extensions import db, jwt


from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Create the Flask app
app = Flask(__name__)

# Configure the app
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///shop.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'iygwhebkdsbxzjdshnvcbljhvsZJhxcbkwhhdvncbjfzxgk')  # Use environment variable
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Set a secret key for session management
app.secret_key = os.getenv('SECRET_KEY', 'f844b09f1e4c7a8d9b0e3f6c5a8d9b0e3f6c5a8d9b0e3f6c5a8d9b0e3f6c5a8d9b')  # Add this line

# Initialize db and jwt with the app
db.init_app(app)
jwt.init_app(app)


# Initialize Flask-Migrate
migrate = Migrate(app, db)

# # Initialize JWTManager
# jwt = JWTManager(app)


# Import all models from models.py
from models import User, Product, Order, OrderItem, Analytics, TokenBlocklist, CartItem, Payment

# Import and register blueprints
from views.users import user_bp
from views.admin import admin_bp
from views.product import product_bp
from views.cart import cart_bp
from views.order import order_bp
from views.analytics import analytics_bp
from views.payment import payment_bp
from views.auth import auth_bp

app.register_blueprint(user_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(product_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(order_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(payment_bp)
app.register_blueprint(auth_bp)

# # Initialize the app with db
# db.init_app(app)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)


