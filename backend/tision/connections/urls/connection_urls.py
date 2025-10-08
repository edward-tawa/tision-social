from connections.views.connection_views import ConnectionListView
from django.urls import path



urlpatterns = [
    path('connections/', ConnectionListView.as_view(), name='connection-list'),
]