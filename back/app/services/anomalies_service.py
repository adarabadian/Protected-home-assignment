from .posts_service import get_posts_from_db
from collections import Counter
from ..utils.posts_utils import get_posts_by_user, validate_posts

def detect_anomalies():
    """
    Detect anomalies in posts based on the following conditions:
    1. Titles shorter than 15 characters.
    2. Duplicate titles by the same user.
    3. Titles used by any user more than 4 times globally.
    
    Returns:
        list: A list of posts with anomaly flags.
    """
    posts = get_posts_from_db()
    posts_by_user = get_posts_by_user(posts)
    global_title_counts = get_global_title_counts(posts)

    anomalies = []

    for user_id, user_post_list in posts_by_user.items():
        # Detect duplicate titles for the current user
        duplicate_titles = get_duplicate_user_titles(user_post_list)

        for post in user_post_list:
            post["flags"] = detect_post_anomalies(post, duplicate_titles, global_title_counts)
            if post["flags"]:
                anomalies.append(post)

    return anomalies


def detect_post_anomalies(post, duplicate_titles, global_title_counts):
    """
    Detects anomalies for a single post and adds appropriate flags.
    """
    flags = {}
    
    if is_title_short(post):
        flags["isShortTitle"] = True

    if post["title"].lower() in duplicate_titles:
        flags["isPostDuplicate"] = True

    if global_title_counts[post["title"].lower()] > 4:
        flags["isCommonTitle"] = True

    return flags


def get_global_title_counts(posts):
    """
    Counts occurrences of each title across ALL users.
    This is for catching bots or users who are spamming the same title.
    """
    validate_posts(posts)
    return Counter(post["title"].lower() for post in posts)


def get_duplicate_user_titles(posts):
    """
    Identifies titles that were used more than once by the same user.
    """
    validate_posts(posts)
    title_counts = Counter(post["title"].lower() for post in posts)
    return {title for title, count in title_counts.items() if count > 1}


def is_title_short(post):
    """
    Checks if a post's title is shorter than 15 characters.
    """
    return len(post["title"]) < 15
