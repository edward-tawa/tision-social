from rest_framework import serializers
from posts.models.post_model import Post
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Text Post Example",
            value={
                "id": 1,
                "author": 5,
                "type": "TEXT",
                "created_at": "28/08/2025",
                "updated_at": "28/08/2025",
                "text": "Hello, world!",
                "image": None,
                "video": None,
                "document": None
            },
        ),
        OpenApiExample(
            "Text + Image Post Example",
            value={
                "id": 2,
                "author": 5,
                "type": "TEXT_IMAGE",
                "created_at": "28/08/2025",
                "updated_at": "28/08/2025",
                "text": "Check this out!",
                "image": "https://example.com/image.png",
                "video": None,
                "document": None
            },
        ),
    ]
)
class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, help_text="Unique identifier of the post.")
    author = serializers.PrimaryKeyRelatedField(read_only=True, help_text="ID of the user who created the post.")
    type = serializers.CharField(source='post_type', help_text="The type of the post (TEXT, IMAGE, VIDEO, DOCUMENT, or combinations).")
    text = serializers.CharField(required=False, allow_blank=True, help_text="Text content of the post, required for text-based post types.")
    image = serializers.URLField(required=False, allow_null=True, help_text="URL of the image for image-based posts.")
    video = serializers.URLField(required=False, allow_null=True, help_text="URL of the video for video-based posts.")
    document = serializers.URLField(required=False, allow_null=True, help_text="URL of the document for document-based posts.")
    created_at = serializers.DateField(read_only=True, format='%d/%m/%Y', help_text="Date the post was created (DD/MM/YYYY).")
    updated_at = serializers.DateField(read_only=True, format='%d/%m/%Y', help_text="Date the post was last updated (DD/MM/YYYY).")

    class Meta:
        model = Post
        fields = ['id', 'author', 'type', 'created_at', 'updated_at', 'text', 'image', 'video', 'document']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, attrs):
        post_type = attrs.get('post_type', getattr(self.instance, 'post_type', None))
        errors = {}
        if post_type in [Post.TEXT, Post.TEXT_IMAGE, Post.TEXT_VIDEO] and not attrs.get('text'):
            errors['text'] = _('Text is required for text-based posts.')
        if post_type in [Post.VIDEO, Post.TEXT_VIDEO] and not attrs.get('video'):
            errors['video'] = _('Video is required for video-based posts.')
        if post_type in [Post.IMAGE, Post.TEXT_IMAGE] and not attrs.get('image'):
            errors['image'] = _('Image is required for image-based posts.')
        if post_type in [Post.DOCUMENT] and not attrs.get('document'):
            errors['document'] = _('Document is required for this post type.')
        if errors:
            raise serializers.ValidationError(errors)
        return attrs

    def create(self, validated_data):
        author = self.context['request'].user
        try:
            post = Post.objects.create(author=author, **validated_data)
            post.clean()  # Validate the post before saving
            post.save()
            return post
        except Exception as e:
            raise serializers.ValidationError({"error": _("Failed to create post: {error}").format(error=str(e))})
