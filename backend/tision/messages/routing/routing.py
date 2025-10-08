from django.urls import re_path
from messages.consumers.chat_consumer import ChatConsumer

chat_urlpatterns = [
    re_path(r'^ws/chat/(?P<user2_id>\d+)/$', ChatConsumer.as_asgi(), name='chat_consumer'),
]
