from django.urls import re_path
from connections.consumers.connection_consumer import ConnectionConsumer

connection_urlpatterns = [
    re_path(r'^ws/connection/$', ConnectionConsumer.as_asgi(), name='connection_consumer'),
]

