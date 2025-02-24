import pytest
from flask import Flask, jsonify
from flask_jwt_extended import create_access_token, JWTManager, verify_jwt_in_request, get_jwt_identity
from functools import wraps
from models import db, User, Product, Order, OrderItem
from app import analytics_bp

# Initialize JWT with custom error handlers
def init_jwt(app):
    jwt = JWTManager(app)

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify(error='Invalid token'), 422

    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return jsonify(error='Unauthorized access'), 403

@pytest.fixture
def app():
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['JWT_SECRET_KEY'] = 'test-secret-key'
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.register_blueprint(analytics_bp)

    db.init_app(app)
    init_jwt(app)  # Initialize JWT with custom error handlers

    with app.app_context():
        db.create_all()

    yield app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def jwt_token(app):
    with app.app_context():
        admin_user = User(username='admin', email='admin@example.com', password='adminpass')
        admin_user.role = 'admin'
        db.session.add(admin_user)
        db.session.commit()
        token = create_access_token(identity=admin_user.id)
        return token

@pytest.fixture
def setup_data(app):
    with app.app_context():
        user1 = User(username='user1', email='user1@example.com', password='user1pass')
        user1.role = 'user'
        user2 = User(username='user2', email='user2@example.com', password='user2pass')
        user2.role = 'user'
        db.session.add_all([user1, user2])
        db.session.commit()

        product1 = Product(name='Product A', price=10.0, category='Category X')
        product2 = Product(name='Product B', price=20.0, category='Category Y')
        db.session.add_all([product1, product2])
        db.session.commit()

        order1 = Order(user_id=user1.id, total_price=50.0, status='Completed')
        order2 = Order(user_id=user2.id, total_price=100.0, status='Completed')
        db.session.add_all([order1, order2])
        db.session.commit()

        order_item1 = OrderItem(order_id=order1.id, product_id=product1.id, quantity=2, subtotal=20.0)
        order_item2 = OrderItem(order_id=order2.id, product_id=product2.id, quantity=3, subtotal=60.0)
        db.session.add_all([order_item1, order_item2])
        db.session.commit()

def test_best_selling_products_unauthorized(client):
    headers = {'Authorization': 'Bearer invalid_token'}
    response = client.get('/analytics/best_selling', headers=headers)
    assert response.status_code == 422  # or 403, depending on your logic
    assert 'error' in response.json  # Check if 'error' key exists
    assert response.json['error'] == 'Invalid token'  # Optional, if the key exists

def test_best_selling_products_success(client, jwt_token, setup_data):
    headers = {'Authorization': f'Bearer {jwt_token}'}
    response = client.get('/analytics/best_selling', headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0
    assert 'product_id' in response.json[0]
    assert 'product_name' in response.json[0]
    assert 'total_sold' in response.json[0]

def test_revenue_analytics_unauthorized(client):
    headers = {'Authorization': 'Bearer invalid_token'}
    response = client.get('/analytics/revenue', headers=headers)
    assert response.status_code == 422  # or 403, depending on your logic
    assert 'error' in response.json  # Check if 'error' key exists
    assert response.json['error'] == 'Invalid token'  # Optional, if the key exists

def test_revenue_analytics_success(client, jwt_token, setup_data):
    headers = {'Authorization': f'Bearer {jwt_token}'}
    response = client.get('/analytics/revenue', headers=headers)
    assert response.status_code == 200
    assert 'total_revenue' in response.json
    assert 'revenue_by_category' in response.json
    assert isinstance(response.json['revenue_by_category'], list)

def test_customer_purchase_trends_unauthorized(client):
    headers = {'Authorization': 'Bearer invalid_token'}
    response = client.get('/analytics/customer_trends', headers=headers)
    assert response.status_code == 422  # or 403, depending on your logic
    assert 'error' in response.json  # Check if 'error' key exists
    assert response.json['error'] == 'Invalid token'  # Optional, if the key exists

def test_customer_purchase_trends_success(client, jwt_token, setup_data):
    headers = {'Authorization': f'Bearer {jwt_token}'}
    response = client.get('/analytics/customer_trends', headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0
    assert 'user_id' in response.json[0]
    assert 'username' in response.json[0]
    assert 'order_count' in response.json[0]

def test_customer_avg_order_unauthorized(client):
    headers = {'Authorization': 'Bearer invalid_token'}
    response = client.get('/analytics/customer_avg_order', headers=headers)
    assert response.status_code == 422  # or 403, depending on your logic
    assert 'error' in response.json  # Check if 'error' key exists
    assert response.json['error'] == 'Invalid token'  # Optional, if the key exists

def test_customer_avg_order_success(client, jwt_token, setup_data):
    headers = {'Authorization': f'Bearer {jwt_token}'}
    response = client.get('/analytics/customer_avg_order', headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0
    assert 'user_id' in response.json[0]
    assert 'username' in response.json[0]
    assert 'avg_order_value' in response.json[0]