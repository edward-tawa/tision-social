# asgi.py

import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application


from custom_auth.websocket_auth.middleware.custom_jwt_auth import JWTAuthMiddleware
from messages.routing import chat_urlpatterns
from connections.routing import connection_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tision.settings")
django.setup()

websocket_urlpatterns = chat_urlpatterns + connection_urlpatterns

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(  # built-in session auth
            JWTAuthMiddleware(  # custom JWT auth
                URLRouter(websocket_urlpatterns)
            )
        )
    ),
})
