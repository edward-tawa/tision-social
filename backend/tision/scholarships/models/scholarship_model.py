from django.db import models
from users.models.user_model import User



class Scholarship(models.Model):
    id = models.AutoField(primary_key=True)
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_scholarships') 
    name = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField()
    requirements = models.JSONField(blank=True, null=True)
    deadline = models.DateField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField()
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_gigs')
    followers = models.ManyToManyField(User, on_delete=models.CASCADE, related_name='followed_jobs')
    



    def __str__(self):
        return self.name or f"Scholarship {self.id}"
