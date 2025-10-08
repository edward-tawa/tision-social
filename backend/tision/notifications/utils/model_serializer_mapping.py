from connections.serializers.connection_serializer import ConnectionSerializer
from events.serializers.event_serializer import EventSerializer
from gigs.serializers.gig_serializer import GigSerializer
from institutions.serializers.institution_serializer import InstitutionSerializer
from jobs.serializers.job_serializer import JobSerializer
from messages.serializers.message_serializer import MessageSerializer
from posts.serializers.post_serializer import PostSerializer
from scholarships.serializers.scholarship_serializer import ScholarshipSerializer
from user_profile.serializers.user_profile_serializer import UserProfileSerializer
from users.serializers.user_serializer import UserSerializer


from connections.models import Connection
from events.models import Event
from gigs.models import Gig
from jobs.models import Job
from institutions.models import Institution
from messages.models import Message
from posts.models import Post
from scholarships.models import Scholarship
from user_profile.models import UserProfile
from users.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

MODEL_SERIALIZER_MAPPING = {
    User: UserSerializer,
    UserProfile: UserProfileSerializer,
    Post: PostSerializer,
    Connection: ConnectionSerializer,
    Message: MessageSerializer,
    Institution: InstitutionSerializer,
    Job: JobSerializer,
    Gig: GigSerializer,
    Event: EventSerializer,
    Scholarship: ScholarshipSerializer,
}

