from typing import Union
from users.models.user_model import User
from connections.models import Connection
from django.db.models import Q


def get_user(user: Union[User, int]) -> User:
    """
    Returns a User instance given a User object or an integer ID.

    Args:
        user (Union[User, int]): The User instance or ID.

    Returns:
        User: The corresponding User instance.

    Raises:
        User.DoesNotExist: If the given ID does not correspond to any user.
    """
    if isinstance(user, User):
        return user
    return User.objects.get(id=user)


def send_connection_request(sender: Union[User, int], receiver: Union[User, int]) -> Connection:
    """
    Creates a pending connection request from sender to receiver.

    Args:
        sender (Union[User, int]): User instance or ID of the sender.
        receiver (Union[User, int]): User instance or ID of the receiver.

    Returns:
        Connection: The created Connection object with status PENDING.

    Raises:
        ValueError: If sender and receiver are the same user, 
                    or if a connection already exists between them.
        User.DoesNotExist: If sender or receiver ID does not exist.
    """
    sender = get_user(sender)
    receiver = get_user(receiver)

    if sender == receiver:
        raise ValueError("Users cannot send requests to themselves")

    if Connection.objects.filter(
        Q(sender=sender, receiver=receiver) | Q(sender=receiver, receiver=sender)
    ).exists():
        raise ValueError("A connection already exists between these users")

    connection = Connection.objects.create(sender=sender, receiver=receiver, status=Connection.PENDING)
    return connection


def accept_connection_request(connection: Connection, user: Union[User, int]) -> bool:
    """
    Accepts a pending connection request for the receiver.

    Args:
        connection (Connection): The connection to accept.
        user (Union[User, int]): User instance or ID of the receiver.

    Returns:
        bool: True if the connection was accepted successfully.

    Raises:
        ValueError: If the connection is not pending or user is not the receiver.
        User.DoesNotExist: If the user ID does not exist.
    """
    user = get_user(user)
    if not (connection.receiver == user and connection.status == Connection.PENDING):
        raise ValueError("No pending connection request found")

    connection.status = Connection.ACCEPTED
    connection.save()
    return True


def reject_connection_request(connection: Connection, user: Union[User, int]) -> bool:
    """
    Rejects a pending connection request for the receiver.

    Args:
        connection (Connection): The connection to reject.
        user (Union[User, int]): User instance or ID of the receiver.

    Returns:
        bool: True if the connection was rejected successfully.

    Raises:
        ValueError: If the connection is not pending or user is not the receiver.
        User.DoesNotExist: If the user ID does not exist.
    """
    user = get_user(user)
    if connection.receiver != user or connection.status != Connection.PENDING:
        raise ValueError("No pending connection request found")

    connection.status = Connection.REJECTED
    connection.save()
    return True


def cancel_connection_request(connection: Connection, user: Union[User, int]) -> bool:
    """
    Cancels a pending connection request sent by the user.

    Args:
        connection (Connection): The connection to cancel.
        user (Union[User, int]): User instance or ID of the sender.

    Returns:
        bool: True if the connection was canceled successfully.

    Raises:
        ValueError: If the connection is not pending or user is not the sender.
        User.DoesNotExist: If the user ID does not exist.
    """
    user = get_user(user)
    if connection.sender != user or connection.status != Connection.PENDING:
        raise ValueError("No pending connection request found")

    connection.status = Connection.CANCELED
    connection.save()
    return True
