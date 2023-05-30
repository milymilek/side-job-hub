from rest_framework import serializers

from .models import Announcement

from sidejobhub.users.serializers import UserSerializer
from sidejobhub.users.models import User

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


class AnnouncementSerializer2(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

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
