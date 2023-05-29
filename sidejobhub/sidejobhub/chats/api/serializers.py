from rest_framework import serializers

from sidejobhub.chats.models import Message, Conversation
from sidejobhub.users.serializers import UserMessageSerializer


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ["name"]


class MessageSerializer(serializers.ModelSerializer):
    from_user = UserMessageSerializer()
    to_user = UserMessageSerializer()
    conversation = ConversationSerializer()

    class Meta:
        model = Message
        fields = (
            "id",
            "conversation",
            "from_user",
            "to_user",
            "content",
            "timestamp",
            "read",
        )

    def get_conversation(self, obj):
        return str(obj.conversation.id)

    def get_from_user(self, obj):
        return UserSerializer(obj.from_user).data

    def get_to_user(self, obj):
        return UserSerializer(obj.to_user).data
