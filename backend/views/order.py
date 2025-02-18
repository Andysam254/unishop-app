from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Order, OrderItem, CartItem, Product

order_bp = Blueprint("order_bp", __name__)

@order_bp.route("/create", methods=["POST"])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    
    if not cart_items:
        return jsonify({"message": "Cart is empty"}), 400
    
    total_price = sum(item.product.price * item.quantity for item in cart_items)
    
    order = Order(user_id=user_id, total_price=total_price, status="Pending")
    db.session.add(order)
    db.session.flush()  # Get order.id before committing
    
    for item in cart_items:
        order_item = OrderItem(order_id=order.id, product_id=item.product_id, quantity=item.quantity)
        db.session.add(order_item)
        db.session.delete(item)  # Remove item from cart after ordering
    
    db.session.commit()
    return jsonify({"message": "Order placed successfully", "order_id": order.id}), 201

@order_bp.route("/history", methods=["GET"])
@jwt_required()
def order_history():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    
    return jsonify([{
        "id": order.id,
        "total_price": order.total_price,
        "status": order.status,
        "created_at": order.created_at,
        "items": [{
            "product": item.product.name,
            "quantity": item.quantity
        } for item in order.items]
    } for order in orders])

@order_bp.route("/track/<int:order_id>", methods=["GET"])
@jwt_required()
def track_order(order_id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first()
    
    if not order:
        return jsonify({"message": "Order not found"}), 404
    
    return jsonify({"id": order.id, "status": order.status, "estimated_delivery": order.estimated_delivery})

@order_bp.route("/update/<int:order_id>", methods=["PUT"])
@jwt_required()
def update_order_status(order_id):
    user_id = get_jwt_identity()
    data = request.json
    
    if "status" not in data:
        return jsonify({"message": "Status is required"}), 400
    
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"message": "Order not found"}), 404
    
    # Only admins should be allowed to update status (you may need to check user role)
    order.status = data["status"]
    db.session.commit()
    
    return jsonify({"message": "Order status updated", "new_status": order.status})
