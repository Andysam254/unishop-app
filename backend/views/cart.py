from flask import Blueprint, jsonify, request


cart_bp = Blueprint('cart_bp', __name__)


@cart_bp.route("/")
def cart():
    return jsonify({"cart": []}), 200