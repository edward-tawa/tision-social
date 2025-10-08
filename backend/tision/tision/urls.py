"""
URL configuration for tision project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    # include app URLs
    path('users/', include('users.urls.user_urls')),
    path('posts/', include('posts.urls.post_urls')),
    path('scholarships/', include('scholarships.urls.scholarship_urls')),
    path('user_profile/', include('user_profile.urls.user_profile_urls')),
    path('connections/', include('connections.urls.connection_urls')),
    path('messages/', include('messages.urls.message_urls')),
    path('gigs/', include('gigs.urls.gig_urls')),
    #path('permissions/', include('permissions.urls')),
    path('institutions/', include('institutions.urls')),
    path('jobs/', include('jobs.urls.job_urls')),
    path('events/', include('events.urls.event_urls')),




    path("admin/", admin.site.urls),
    # Schema endpoint
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Swagger UI
    path("api/docs/swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    # Redoc UI
    path("api/docs/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
