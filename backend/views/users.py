from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, db
from werkzeug.security import generate_password_hash

user_bp = Blueprint('user_bp', __name__, url_prefix='/users')

# Get all users (Admin Only)
@user_bp.route('/', methods=['GET'])
@jwt_required()
def get_users():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Only admins can access this endpoint
    if current_user.role != 'admin':
        return jsonify({"error": "Unauthorized access"}), 403

    users = User.query.all()
    user_list = [{"id": u.id, "username": u.username, "email": u.email, "role": u.role} for u in users]
    return jsonify(user_list), 200

# Get a single user (Admin or the user themselves)
@user_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Only admins or the user themselves can access this endpoint
    if current_user.role != 'admin' and current_user_id != user_id:
        return jsonify({"error": "Unauthorized access"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
        "profile_image": user.profile_image
    }), 200

# Update user profile (Admin or the user themselves)
@user_bp.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Only admins or the user themselves can update the profile
    if current_user.role != 'admin' and current_user_id != user_id:
        return jsonify({"error": "Unauthorized action"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if "username" in data:
        user.username = data["username"]
    if "email" in data:
        user.email = data["email"]
    if "password" in data:
        user.password_hash = generate_password_hash(data["password"])
    if "profile_image" in data:
        user.profile_image = data["profile_image"]

    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# Delete user account (Admin or the user themselves)
@user_bp.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Only admins or the user themselves can delete the account
    if current_user.role != 'admin' and current_user_id != user_id:
        return jsonify({"error": "Unauthorized action"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# Promote a user to admin (Admin Only)
@user_bp.route('/<int:user_id>/promote', methods=['PUT'])
@jwt_required()
def promote_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Only admins can access this endpoint
    if current_user.role != 'admin':
        return jsonify({"error": "Unauthorized access"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Promote the user to admin
    user.role = 'admin'
    db.session.commit()

    return jsonify({"message": "User promoted to admin successfully"}), 200