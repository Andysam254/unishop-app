from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Product, db, User

product_bp = Blueprint('product_bp', __name__, url_prefix='/products')

# Create a new product (Admin Only)
@product_bp.route('/', methods=['POST'])
@jwt_required()
def create_product():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Only admins can create products
    if current_user.role != 'admin':
        return jsonify({"error": "Unauthorized access"}), 403

    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    stock = data.get('stock')
    category = data.get('category')
    image_url = data.get('image_url')

    if not name or not price or not category:
        return jsonify({"error": "Name, price, and category are required"}), 400

    new_product = Product(
        name=name,
        description=description,
        price=price,
        stock=stock,
        category=category,
        image_url=image_url
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Product created successfully", "product_id": new_product.id}), 201

# Get all products (Public Access)
@product_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    product_list = [{
        "id": p.id,
        "name": p.name,
        "description": p.description,
        "price": p.price,
        "stock": p.stock,
        "category": p.category,
        "image_url": p.image_url,
        "created_at": p.created_at
    } for p in products]
    return jsonify(product_list), 200

# Get a single product (Public Access)
@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    return jsonify({
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "stock": product.stock,
        "category": product.category,
        "image_url": product.image_url,
        "created_at": product.created_at
    }), 200

# Update a product (Admin Only)
@product_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Only admins can update products
    if current_user.role != 'admin':
        return jsonify({"error": "Unauthorized access"}), 403

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    data = request.get_json()
    if "name" in data:
        product.name = data["name"]
    if "description" in data:
        product.description = data["description"]
    if "price" in data:
        product.price = data["price"]
    if "stock" in data:
        product.stock = data["stock"]
    if "category" in data:
        product.category = data["category"]
    if "image_url" in data:
        product.image_url = data["image_url"]

    db.session.commit()
    return jsonify({"message": "Product updated successfully"}), 200

# Delete a product (Admin Only)
@product_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Only admins can delete products
    if current_user.role != 'admin':
        return jsonify({"error": "Unauthorized access"}), 403

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200