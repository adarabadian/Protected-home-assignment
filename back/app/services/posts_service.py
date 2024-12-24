import requests

# While I understand I could've placed everything in one posts service (because it's our resource), 
# I decided to split the logic into multiple services for better readability and maintainability.

# This method is for getting the posts from the API, Im using this like a DB

#! IF YOU WANT TO USE DATA I USED FOR TESTING, USE THE JSON FILE AND UNCOMMMENT THIS METHOD
#! import json
#! def get_posts_from_db():
#! 	f = open('testdata.json')
#! 	data = json.load(f)
#! 	return data

def get_posts_from_db():
	try:
		response = requests.get('https://jsonplaceholder.typicode.com/posts')
		response.raise_for_status()
		return response.json()
	except requests.exceptions.RequestException as e:
		return {"error": str(e)}
