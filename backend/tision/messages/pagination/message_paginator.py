from rest_framework.pagination import CursorPagination



class MessageCursorPagination(CursorPagination):
    page_size = 20
    max_page_size = 25
    ordering = '-timestamp'  # Order by timestamp descending
    cursor_query_param = 'cursor'