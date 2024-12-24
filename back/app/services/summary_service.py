from collections import Counter
from .posts_service import get_posts_from_db

# I'm returning the responses in camel case (jsVariable) as it's the convention for JS.
# I could've used snake case (python_variable) or convert them with a method
# but I wanted to keep the naming consistent and make things simple.

def generate_summary():
	"""
	Returns a summary of:
	1. Top three users with the most unique words in their post titles.
	2. Most frequently used words across all post titles.
	"""
	posts = get_posts_from_db()

	return {
		"topUsers": get_top_users_by_unique_words(posts),
		"mostFrequentWords": get_most_frequent_words(posts),
	}


def get_top_users_by_unique_words(posts):
	"""
	Finds the top 3 users with the most unique words in their titles.
	"""
	user_titles = group_titles_by_user(posts)
	user_unique_word_counts = calculate_unique_word_counts(user_titles)

	# Sort by unique word count and get top 3 users
	top_users = sorted(user_unique_word_counts.items(), key=lambda x: x[1], reverse=True)[:3]

	return [{"userId": user, "uniqueWordCount": count} for user, count in top_users]


def get_most_frequent_words(posts):
	"""
	Finds the most frequent words across all post titles.
	"""
	all_words = extract_all_words(posts)
	word_frequencies = Counter(all_words).most_common(40)  # Top 40 words

	return [{"value": word, "count": count} for word, count in word_frequencies]


def group_titles_by_user(posts):
	"""
	Groups post titles by userId.
	"""
	user_titles = {}
	for post in posts:
		user_titles.setdefault(post["userId"], []).append(post["title"])
	return user_titles


def calculate_unique_word_counts(user_titles):
	"""
	Calculates the number of unique words per user.
	"""
	unique_word_counts = {}
	for user_id, titles in user_titles.items():
		unique_words = set(word.lower() for title in titles for word in title.split())
		unique_word_counts[user_id] = len(unique_words)

	return unique_word_counts


def extract_all_words(posts):
	"""
	Extracts all words from all post titles.
	"""
	return [
		word.lower() 
		for post in posts 
		for word in post["title"].split() 
		# Filter out words with less than 3 characters, I.E. "a", "an", "to"...
		if len(word) >= 3
	]
