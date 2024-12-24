from flask import Blueprint, jsonify
from .services.posts_service import get_posts_from_db
from .services.anomalies_service import detect_anomalies
from .services.summary_service import generate_summary
import requests

main = Blueprint('main', __name__)

# This was a demand from the home assignment
# but I dont actually use it in UI as there was no need for it
@main.route('/posts', methods=['GET'])
def get_posts():
	try:
		posts = get_posts_from_db()
		return jsonify(posts)
	except requests.exceptions.RequestException as e:
		return jsonify({"error": str(e)}), 500


@main.route('/anomalies', methods=['GET'])
def anomalies():
	anomalies_data = detect_anomalies()
	if "error" in anomalies_data:
		return jsonify(anomalies_data), 500
	return jsonify(anomalies_data), 200


@main.route('/summary', methods=['GET'])
def summary():
	summary_data = generate_summary()
	if "error" in summary_data:
		return jsonify(summary_data), 500
	return jsonify(summary_data), 200
