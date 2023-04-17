from accounts.models import UserAccount as User
from rest_framework import serializers
from chatRoom.models import RoomMessage

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    """For Serializing User"""
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']  # incluir el campo 'password' en la lista de campos

# Message Serializer
class MessageSerializer(serializers.ModelSerializer):
    """For Serializing Message"""
    sender = serializers.SlugRelatedField(many=False, slug_field='email', queryset=User.objects.all())

    class Meta:
        model = RoomMessage
        fields = ['sender', 'message', 'timestamp']
