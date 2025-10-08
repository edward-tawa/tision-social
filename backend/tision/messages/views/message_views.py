from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from messages.serializers.message_serializer import MessageSerializer
from messages.pagination.message_paginator import MessageCursorPagination
from messages.models.message_model import Message
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiTypes
from django.utils.translation import gettext_lazy as _
from django.core.cache import cache
from django.db.models import Q


@extend_schema(
    tags=["Messages"],
    summary="List all messages for the authenticated user",
    description=(
        "Retrieves all messages where the authenticated user is either the sender or the receiver. "
        "Messages are ordered by timestamp. Each message includes sender, receiver, type, content, "
        "and timestamp. Uses the MessageSerializer which includes examples and field descriptions."
    ),
    parameters=[
        OpenApiParameter(
            name='cursor',
            description='Cursor for pagination (from previous page)',
            required=False,
            type=OpenApiTypes.STR
        ),
    ],
    responses={200: MessageSerializer(many=True)},
)
class MessagesListView(APIView):
    """
    API view to list all messages for the logged-in user.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer
    pagination_class = MessageCursorPagination

    def get(self, request):
        try:
            cursor = request.query_params.get('cursor', '')
            page_size = request.query_params.get('page_size', 20)
            cache_key = f'messages_{request.user.id}_cursor_{cursor}_page_size_{page_size}'
            cached_data = cache.get(cache_key)
            if cached_data:
                return Response(cached_data, status=status.HTTP_200_OK)
            messages = Message.objects.filter(
                Q(sender=request.user) | Q(receiver=request.user)
            ).order_by('timestamp')
            paginator = self.pagination_class()
            page = paginator.paginate_queryset(messages, request, view=self)
            if page:
                serialized_data = self.serializer_class(page, many=True).data
                cache.set(cache_key, serialized_data, timeout=300)  # cache only serialized data
                return paginator.get_paginated_response(serialized_data)

            serialized_data = self.serializer_class(messages, many=True).data
            cache.set(cache_key, serialized_data, timeout=300)
            return Response(serialized_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": _(f'{str(e)}')},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
