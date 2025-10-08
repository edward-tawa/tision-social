from rest_framework import serializers
from events.models.event_model import Event
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            name="Sample Event",
            description="Example of an event object",
            value={
                "id": 1,
                "name": "Team Meeting",
                "description": "Monthly team meeting to discuss progress.",
                "location": "Conference Room A",
                "date": "27/08/2025",
                "start_time": "09:00",
                "end_time": "10:30"
            }
        )
    ]
)
class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for Event model.
    
    Fields:
    - `id`: Unique identifier of the event (read-only)
    - `name`: Name of the event
    - `description`: Detailed description of the event
    - `location`: Location where the event will take place
    - `date`: Date of the event (format: DD/MM/YYYY)
    - `start_time`: Event start time (format: HH:MM)
    - `end_time`: Event end time (format: HH:MM)
    """

    id = serializers.AutoField(
        read_only=True,
        help_text="Unique identifier for the event."
    )
    start_time = serializers.TimeField(
        format='%H:%M',
        input_formats=['%H:%M'],
        help_text="Start time of the event (HH:MM)."
    )
    end_time = serializers.TimeField(
        format='%H:%M',
        input_formats=['%H:%M'],
        help_text="End time of the event (HH:MM)."
    )
    date = serializers.DateTimeField(
        format='%d/%m/%Y',
        input_formats=['%d/%m/%Y'],
        help_text="Date of the event (DD/MM/YYYY)."
    )

    class Meta:
        model = Event
        fields = [
            'id',
            'name',
            'description',
            'location',
            'date',
            'start_time',
            'end_time'
        ]
