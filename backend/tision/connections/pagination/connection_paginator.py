from rest_framework.pagination import LimitOffsetPagination

class ConnectionLimitOffsetPagination(LimitOffsetPagination):
    default = 10
    max_limit = 20
