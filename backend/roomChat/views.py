from accounts.models import UserAccount 
from django.http.response import JsonResponse
from firefly.utils import get_user_id
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import ChatRoom, RoomMessage
import json


@api_view(['POST'])
def send_message(request, **kwargs):
    data = json.loads(request.body.decode('utf-8'))
    user_id = get_user_id(request)
    room_id = kwargs['room_id']
    sender = UserAccount.objects.get(id=user_id)
    chatroom = ChatRoom.objects.get(id=room_id)
    message_content = data.get('message')

    message = RoomMessage(sender=sender, room=chatroom, message=message_content)
    message.save()
    chatroom.messages.add(message)

    # guardar el mensaje en la base de datos

    return JsonResponse({ 'Confirm': 'Message sent to the group' })

@api_view(['GET'])
def lista_mensajes(request, **kwargs):
    room_id = kwargs['room_id']
    chatroom = ChatRoom.objects.get(id=room_id)
    messages = RoomMessage.objects.filter(room=chatroom).order_by('timestamp') 
    message_list = []
    for message in messages:
        message_dict = {
            'name': message.sender.name,
            'content': message.message
        }
        message_list.append(message_dict)

    return JsonResponse({'messages': message_list})


@api_view(['GET'])
def get_chatroom_members(request, **kwargs):
    chatroom = get_object_or_404(ChatRoom, id = kwargs['room_id'])
    members = chatroom.members.all()
    member_list = [{'id': member.id, 'name': member.name} for member in members]
    return JsonResponse({'members': member_list})

@api_view(['POST'])
def create_room(request):
    user = get_user_id(request)
    data = request.data
    room_name = data.get('room_name')
    friends_in_room = data.get('members')

    # Creamos la sala de chat
    room = ChatRoom.objects.create(name=room_name)
    room.members.add(user)
    # Agregamos los amigos a la sala de chat
    for friend_id in friends_in_room:
        friend = UserAccount.objects.get(id=friend_id)
        room.members.add(friend)

    # Devolvemos una respuesta JSON con un mensaje de éxito
# Devolvemos una respuesta JSON con el nombre de la sala de chat y los ID de los miembros agregados
    return JsonResponse({
        'message': 'ChatRoom created and friends added',
        'room_name': room_name,
        'id_room': room.id,
        'member_ids': friends_in_room + [user] # Agregamos también el ID del usuario actual
    })

@api_view(['GET'])
def get_rooms(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id=user_id)
    chat_rooms = user.chat_rooms.all()
    data = {
        'chat_rooms': list(chat_rooms.values('id', 'name')),
    }
    return JsonResponse(data)