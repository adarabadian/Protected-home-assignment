from collections import defaultdict


def get_posts_by_user(posts):
    """
    Groups posts by userId.
    """
    validate_posts(posts)
    user_posts = defaultdict(list)

    for post in posts:
        user_posts[post["userId"]].append(post)

    return user_posts


def validate_posts(posts):
    """
    Validates that the input is a list of posts.
    """
    if not isinstance(posts, list):
        raise ValueError("Expected a list of posts")
