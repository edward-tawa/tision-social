from django.db import models
from users.models.user_model import User




class Connection(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'
    CANCELED = 'canceled'

    STATUS_CHOICES = [
        (PENDING, 'pending'),
        (ACCEPTED, 'accepted'),
        (REJECTED, 'rejected'),
        (CANCELED, 'canceled')
    ]

    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_connections')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_connections')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default=PENDING)
    timestamp = models.DateTimeField(auto_now_add = True)

    @property
    def sender_name(self):
        return self.sender.username
    
    @property
    def receiver_name(self):
        return self.receiver.username
    
    
    
    def save(self, *args, **kwargs):
        if self.sender == self.receiver:
            raise ValueError("Users cannot connect to themselves.")
        super().save(*args, **kwargs)

    
    def __str__(self):
        return f'Connection request {self.sender_name} -> {self.receiver_name}'
    

    class Meta:
        unique_together = ('sender', 'receiver')