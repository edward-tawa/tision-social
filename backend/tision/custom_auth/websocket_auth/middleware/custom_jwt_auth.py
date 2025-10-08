import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser

User = get_user_model()

@database_sync_to_async
def get_user_from_payload(payload):
    try:
        return User.objects.get(id=payload['user_id'])
    except User.DoesNotExist:
        return AnonymousUser()

class JWTAuthMiddleware(BaseMiddleware):
    """
    Custom middleware to populate scope['user'] from JWT in cookies.
    """
    async def __call__(self, scope, receive, send):
        # Default to anonymous
        scope['user'] = AnonymousUser()

        # Extract token from cookies
        headers = dict(scope['headers'])
        cookie_header = headers.get(b'cookie', b'').decode()
        token = None
        for part in cookie_header.split(';'):
            key, sep, value = part.strip().partition('=')
            if key == 'jwt':  # assuming your cookie key is 'jwt'
                token = value
                break

        if token:
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                scope['user'] = await get_user_from_payload(payload)
            except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
                scope['user'] = AnonymousUser()

        return await super().__call__(scope, receive, send)

            
        
