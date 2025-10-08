from rest_framework.routers import DefaultRouter
from posts.views.post_views import PostViewSet


router = DefaultRouter()
router.register(r'post', PostViewSet, basename='post')
urlpatterns = router.urls

# Generated URLs by DefaultRouter for PostViewSet:
# GET      /post/           -> list all posts
# POST     /post/           -> create new post
# GET      /post/<pk>/      -> retrieve post with id=<pk>
# PUT      /post/<pk>/      -> update post with id=<pk>
# PATCH     /post/<pk>/      -> partial update post with id=<pk>
# DELETE      /post/<pk>/      -> delete post with id=<pk>
# This allows for CRUD operations on the Post model through the API.