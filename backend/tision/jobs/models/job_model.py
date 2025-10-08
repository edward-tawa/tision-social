from django.db import models
from users.models.user_model import User





class Job(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    date_posted = models.DateField(auto_now_add=True)
    expiry_date = models.DateField(blank=True, null=True)
    duration = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_jobs')
    followers = models.ManyToManyField(User, on_delete=models.CASCADE, related_name='followed_jobs')


    def __str__(self):
        return f'{self.title} in {self.location}'