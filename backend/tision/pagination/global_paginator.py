from rest_framework.pagination import LimitOffsetPagination

class GlobalLimitOffsetPagination(LimitOffsetPagination):
    default = 10
    max_limit = 20
