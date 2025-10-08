from rest_framework.viewsets import ModelViewSet
from events.models.event_model import Event
from events.serializers.event_serializer import EventSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from pagination.global_paginator import GlobalLimitOffsetPagination
from django.core.cache import cache
from django.utils import timezone
from events.caching.utils.event_catching import bump_version, get_current_version



@extend_schema(
    tags=["Events"],
    summary="Manage Events",
    description="CRUD operations for events (requires authentication).",
    parameters=[
        OpenApiParameter(
            name='limit',
            type=OpenApiTypes.INT,
            description='Number of items to return (pagination limit)',
            required=False,
        ),
        OpenApiParameter(
            name='offset',
            type=OpenApiTypes.INT,
            description='Number of items to skip before starting to collect the result set',
            required=False,
        ),
    ],
    request=EventSerializer,
    responses={200: EventSerializer},
    examples=[
        OpenApiExample(
            "Example Event",
            value={
                "id": 1,
                "date": "27/08/2025",
                "start_time": "09:00",
                "end_time": "11:00",
            },
            response_only=True,
        ),
    ],
)



class EventViewSet(ModelViewSet):
    """
    A viewset for viewing and editing events.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    pagination_class = GlobalLimitOffsetPagination

    # VERSION_KEY = f'event_version'
    # TIME_KEY = f'event_time'
    TIMEOUT = 300


    def get_queryset(self):
        user_id = self.request.user.id
        version_key = f'event_version_{user_id}'
        time_key = f'event_time_{user_id}'
        timeout = EventViewSet.TIMEOUT

        # Bump version if timeout passed; always returns current version
        current_version = bump_version(version_key, time_key, timeout)
        # Use versioned cache key
        cache_key = f'event_queryset_{user_id}_v{current_version}'
        # Try fetching cached queryset
        qs = cache.get(cache_key)
        if qs is None:
            # Cache miss or timeout: fetch fresh queryset and store it
            qs = Event.objects.all()
            cache.set(cache_key, qs, timeout=timeout)
        return qs
