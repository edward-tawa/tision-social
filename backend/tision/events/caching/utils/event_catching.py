from django.core.cache import cache
from django.utils import timezone

def set_time(time_key):
    """
    Set the current timestamp in the cache for the given key.

    Args:
        time_key (str): The cache key under which to store the current time.

    Behavior:
        Stores timezone.now() in the cache under `time_key`.
    """
    cache.set(time_key, timezone.now())

def get_set_time(time_key):
    """
    Retrieve the cached timestamp for a given key, or initialize it if missing.

    Args:
        time_key (str): The cache key to retrieve the timestamp from.

    Returns:
        datetime: The cached timestamp.

    Behavior:
        - If a value exists for `time_key`, return it.
        - Otherwise, set it to the current time and return that.
    """
    last_set_time = cache.get(time_key)
    if not last_set_time:
        set_time(time_key)
        last_set_time = cache.get(time_key)
    return last_set_time

def set_version(version_key, version=1, time_key=None):
    """
    Set a version number in the cache and optionally update its timestamp.

    Args:
        version_key (str): The cache key for the version.
        version (int, optional): The version number to set. Defaults to 1.
        time_key (str, optional): Optional cache key to update the timestamp. Defaults to None.

    Behavior:
        - Sets `version` in the cache under `version_key`.
        - If `time_key` is provided, also updates its timestamp to now.
    """
    cache.set(version_key, version)
    if time_key:
        set_time(time_key)

def get_current_version(version_key):
    """
    Retrieve the current version number from the cache, initializing it if missing.

    Args:
        version_key (str): The cache key for the version.

    Returns:
        int: The current version number.

    Behavior:
        - If a version exists in the cache, return it.
        - Otherwise, initialize it to 1 and return 1.
    """
    current_version = cache.get(version_key)
    if current_version is None:
        set_version(version_key)
        current_version = cache.get(version_key)
    return current_version

def bump_version(version_key, time_key, timeout):
    """
    Increment the version number if the timeout has passed since the last update.

    Args:
        version_key (str): Cache key for the version number.
        time_key (str): Cache key for the last bump timestamp.
        timeout (int): Timeout in seconds before the version can be bumped again.

    Returns:
        int: The current (possibly bumped) version number.

    Behavior:
        - Checks the last bump time stored under `time_key`.
        - If the timeout has elapsed, increments the version and updates `time_key`.
        - Always returns the current version after any bump.
    """
    current_version = get_current_version(version_key)
    last_set_time = get_set_time(time_key)
    current_time = timezone.now()

    if (current_time - last_set_time).total_seconds() > timeout:
        new_version = current_version + 1
        cache.set(version_key, new_version)
        set_time(time_key)

    return get_current_version(version_key)
