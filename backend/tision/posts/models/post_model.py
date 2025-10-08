from django.db import models
from users.models.user_model import User
from django.core.exceptions import ValidationError





class Post(models.Model):
    TEXT = 'text'
    IMAGE = 'image'
    VIDEO = 'video'
    TEXT_IMAGE = 'text_image'
    TEXT_VIDEO = 'text_video'
    DOCUMENT = 'document'

    POST_TYPE_CHOICES = [
        (TEXT, 'Text Only'),
        (IMAGE, 'Image Only'),
        (VIDEO, 'Video Only'),
        (TEXT_IMAGE, 'Text + Image'),
        (TEXT_VIDEO, 'Text + Video'),
        (DOCUMENT, 'Document Only'),
    ]
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    post_type = models.CharField(max_length=20, choices=POST_TYPE_CHOICES, default=TEXT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    text = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='post/images/', blank=True, null=True)
    video = models.FileField(upload_to='post/videos/', blank=True, null=True)
    document = models.FileField(upload_to='post/documents/', blank=True, null=True)


    def clean(self):
        errors = {}
        if self.post_type in [self.TEXT, self.TEXT_IMAGE, self.TEXT_VIDEO] and not self.text:
            errors['text'] = 'Text is required for text-based posts.'
        if self.post_type in [self.IMAGE, self.TEXT_IMAGE] and not self.image:
            errors['image'] = 'Image is required for image-based posts.'
        if self.post_type in [self.VIDEO, self.TEXT_VIDEO] and not self.video:
            errors['video'] = 'Video is required for video-based posts.'
        if self.post_type == self.DOCUMENT and not self.document:
            errors['document'] = 'Document is required for this post type.'
        if errors:
            raise ValidationError(errors)
        
    def __str__(self):
        return f"{self.get_post_type_display()} by {self.author.username} ({self.created_at:%d/%m/%Y})"
