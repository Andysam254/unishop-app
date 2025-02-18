from flask import Blueprint, jsonify, request


analytics_bp = Blueprint('analytics_bp', __name__)


@analytics_bp.route("/")
def analytics():
    return jsonify({"analytics": []}), 200