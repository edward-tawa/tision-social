from django.db import models
from users.models.user_model import User



class Institution(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    offers = models.JSONField()
    logo_url = models.URLField(blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField()
    verified = models.BooleanField() 
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_gigs')   
    followers = models.ManyToManyField(User, on_delete=models.CASCADE, related_name='followed_institutions')