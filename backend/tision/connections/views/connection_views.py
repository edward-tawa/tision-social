from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from connections.models.connection_model import Connection
from connections.serializers.connection_serializer import ConnectionSerializer
from connections.pagination.connection_paginator import ConnectionLimitOffsetPagination
from connections.utils.connection_requests import (
        send_connection_request, accept_connection_request, 
        reject_connection_request, cancel_connection_request
    )
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiTypes, OpenApiParameter
from drf_spectacular.utils import OpenApiExample


class ConnectionListView(APIView):
    """
    API endpoint to retrieve all connections related to the authenticated user.
    Includes both sent and received connections.
    """
    permission_classes = [IsAuthenticated]
    pagination_class = ConnectionLimitOffsetPagination

    @extend_schema(
        summary="List user connections",
        description=(
            "Retrieve a list of all connections for the authenticated user."
            "This includes both connections sent and received."
            "Results are ordered by timestamp (oldest first)."
        ),
        parameters = [
            OpenApiParameter(
                name='limit',
                type=OpenApiTypes.INT,
                description='Number of connections to return',
                required=False
            ),
            OpenApiParameter(
                name='offset',
                type=OpenApiTypes.INT,
                description='Number of connections to skip',
                required=False
            )
        ],
        responses={
            200: ConnectionSerializer(many=True),
            401: OpenApiResponse(description="Authentication required."),
            500: OpenApiResponse(description="Error occurred during serialization."),
        },
        tags=["Connections"],
    )
    def get(self, request):
        connections = Connection.objects.filter(
            Q(sender=request.user) | Q(receiver=request.user)
        ).order_by("timestamp")
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(connections, request, view=self)
        try:
            if page is not None:
                serializer = ConnectionSerializer(page, many=True)
                return paginator.get_paginated_response(serializer.data)
            
            serializer = ConnectionSerializer(connections, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": _(f"Error {str(e)} occurred during serialization")},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        



class ConnectionRequests(ModelViewSet):
    """
    API endpoint for managing connection requests between users.
    
    Actions:
    - send_connection: Send a new connection request.
    - accept_connection: Accept a pending connection request.
    - reject_connection: Reject a pending connection request.
    - cancel_connection: Cancel a pending connection request.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ConnectionSerializer

    @extend_schema(
        summary="Send a connection request",
        description="Send a connection request to another user. The sender is inferred from the authenticated user.",
        request=ConnectionSerializer,
        examples=[
            OpenApiExample(
                "Send Connection Example",
                summary="Send connection",
                description="Send a connection request to a specific user by their ID.",
                value={"receiver": 20},
                request_only=True,
            ),
        ],
        responses={
            201: OpenApiResponse(description="Connection sent successfully"),
            400: OpenApiResponse(description="Validation or error occurred")
        },
        tags=["Connections"]
    )
    @action(detail=False, methods=['post'], url_path='send', url_name='send')
    def send_connection(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        receiver = serializer.validated_data.get('receiver')
        try:
            connection = send_connection_request(request.user, receiver)
            if connection:
                return Response({'message': _('Connection sent successfully')}, status=status.HTTP_201_CREATED)
            return Response({'error': _('Failed to send connection request')}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except ValueError as ve:
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary="Accept a connection request",
        description="Accept a pending connection request. The authenticated user must be the receiver.",
        responses={
            200: OpenApiResponse(description="Connection accepted successfully"),
            400: OpenApiResponse(description="Validation error"),
            404: OpenApiResponse(description="Connection not found")
        },
        tags=["Connections"]
    )
    @action(detail=True, methods=['post'], url_path='accept', url_name='accept')
    def accept_connection(self, request, pk=None):
        connection = self.get_object()
        try:
            accept_connection_request(connection, request.user)
            return Response({'message': _('Connection accepted successfully')}, status=status.HTTP_200_OK)
        except ValueError as ve:
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary="Reject a connection request",
        description="Reject a pending connection request. The authenticated user must be the receiver.",
        responses={
            200: OpenApiResponse(description="Connection rejected successfully"),
            400: OpenApiResponse(description="Validation error"),
            404: OpenApiResponse(description="Connection not found")
        },
        tags=["Connections"]
    )
    @action(detail=True, methods=['post'], url_path='reject', url_name='reject')
    def reject_connection(self, request, pk=None):
        connection = self.get_object()
        try:
            reject_connection_request(connection, request.user)
            return Response({'message': _('Connection rejected successfully')}, status=status.HTTP_200_OK)
        except ValueError as ve:
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary="Cancel a connection request",
        description="Cancel a pending connection request. The authenticated user must be the sender.",
        responses={
            200: OpenApiResponse(description="Connection canceled successfully"),
            400: OpenApiResponse(description="Validation error"),
            404: OpenApiResponse(description="Connection not found")
        },
        tags=["Connections"]
    )
    @action(detail=True, methods=['post'], url_path='cancel', url_name='cancel')
    def cancel_connection(self, request, pk=None):
        connection = self.get_object()
        try:
            cancel_connection_request(connection, request.user)
            return Response({'message': _('Connection canceled successfully')}, status=status.HTTP_200_OK)
        except ValueError as ve:
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)
