from rest_framework import serializers

from .models import Announcement


class AnnouncementSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(many=False)

    class Meta:
        model = Announcement
        fields = (
            'title',
            'description',
            'created_by',
            'price',
            'availability',
            'contact',
            'longitude',
            'latitude'
        )
