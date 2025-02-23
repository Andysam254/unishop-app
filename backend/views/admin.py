from flask import Blueprint, jsonify, request


admin_bp = Blueprint('admin_bp', __name__)


@admin_bp.route("/")
def admin():
    return jsonify({"admin": []}), 200