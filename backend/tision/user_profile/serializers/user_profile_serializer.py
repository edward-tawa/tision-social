from rest_framework import serializers
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample

from user_profile.models.bio.bio_model import Bio
from user_profile.models.education.education_model import Education
from user_profile.models.experience.experience_model import Experience
from user_profile.models.interest.interest_model import Interest
from user_profile.models.project.project_model import Project

from user_profile.serializers.bio.bio_serializer import BioSerializer
from user_profile.serializers.education.education_serializer import EducationSerializer
from user_profile.serializers.experience.experience_serializer import ExperienceSerializer
from user_profile.serializers.interest.interest_serializer import InterestSerializer
from user_profile.serializers.project.project_serializer import ProjectSerializer


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Full User Profile Example",
            value={
                "bio": {
                    "name": "Edward Taguma Tawa",
                    "location": "Harare, Zimbabwe",
                    "email": "edward@example.com",
                    "description": "Software engineer",
                    "website": "https://edward.dev",
                    "employment_status": "Employed"
                },
                "education": [
                    {
                        "institution": "Harare Institute of Technology",
                        "role": "Student",
                        "location": "Harare",
                        "start_date": "01/02/2020",
                        "end_date": "30/11/2023",
                        "qualifications": "BSc Computer Science"
                    }
                ],
                "experience": [
                    {
                        "company": "Tech Solutions Ltd",
                        "role": "Software Engineer",
                        "location": "Harare",
                        "technologies": "Python, Django, React",
                        "description": "Developed web apps",
                        "start_date": "01/03/2020",
                        "end_date": "31/12/2023"
                    }
                ],
                "interests": [
                    {"name": "Software Development"}
                ],
                "projects": [
                    {
                        "title": "Portfolio Website",
                        "description": "Showcase projects",
                        "role": "Full-Stack Developer",
                        "repo_link": "https://github.com/username/portfolio",
                        "start_date": "01/06/2024",
                        "end_date": "30/08/2024",
                        "is_ongoing": False
                    }
                ]
            }
        )
    ]
)
class UserProfileSerializer(serializers.Serializer):
    bio = BioSerializer(
        required=False, 
        help_text="The user's biography information (One-to-One related object)."
    )
    education = EducationSerializer(
        many=True, 
        required=False, 
        help_text="List of the user's education history."
    )
    experience = ExperienceSerializer(
        many=True, 
        required=False, 
        help_text="List of the user's work experience."
    )
    interests = InterestSerializer(
        many=True, 
        required=False, 
        help_text="List of the user's interests."
    )
    projects = ProjectSerializer(
        many=True, 
        required=False, 
        help_text="List of the user's projects."
    )

    def to_representation(self, user):
        """
        Return a full user profile using related objects.
        Handles missing data gracefully.
        """
        # Bio (OneToOneField)
        try:
            bio_instance = user.bio
        except Bio.DoesNotExist:
            bio_instance = None

        return {
            "bio": BioSerializer(bio_instance).data if bio_instance else None,
            "education": EducationSerializer(user.education.all(), many=True).data,
            "experience": ExperienceSerializer(user.experience.all(), many=True).data,
            "interests": InterestSerializer(user.interests.all(), many=True).data,
            "projects": ProjectSerializer(user.projects.all(), many=True).data,
        }
