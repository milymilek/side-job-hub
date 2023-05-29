from rest_framework import serializers

from .models import Announcement

from sidejobhub.users.serializers import UserSerializer

class AnnouncementSerializer(serializers.ModelSerializer):
    #created_by_name = serializers.StringRelatedField(many=False)
    created_by = UserSerializer()

    class Meta:
        model = Announcement
        fields = (
            'id',
            'title',
            'description',
            'created_by',
            'price',
            'availability',
            'contact',
            'longitude',
            'latitude'
        )
