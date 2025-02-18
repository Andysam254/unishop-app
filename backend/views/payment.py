from flask import Blueprint, jsonify, request


payment_bp = Blueprint('payment_bp', __name__)


@payment_bp.route("/")
def payments():
    return jsonify({"payments": []}), 200