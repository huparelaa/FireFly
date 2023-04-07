from django.db.models import Q
import json
from django.http import HttpResponse
from accounts.models import UserAccount as User
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from firefly.utils import verify_token, get_user_id
from chat.models import Message                                                   # Our Message model
from chat.serializers import MessageSerializer, UserSerializer # Our Serializer Classes
from rest_framework.decorators import api_view
from jwt.exceptions import InvalidSignatureError
# Users View

@csrf_exempt                                                              # Decorator to make the view csrf excempt.
def user_list(request, pk=None):
    
    """
    List all required messages, or create a new message.
    """
    if request.method == 'GET':
        if pk:                                     # If PrimaryKey (id) of the user is specified in the url
            users = User.objects.filter(id=pk)     # Select only that particular user
        else:
            users = User.objects.all()             # Else get all user list
        serializer = UserSerializer(users, many=True, context={'request': request}) 
        return JsonResponse(serializer.data, safe=False)               # Return serialized data
    elif request.method == 'POST':
        data = JSONParser().parse(request)           # On POST, parse the request object to obtain the data in json
        serializer = UserSerializer(data=data)       # Seraialize the data
        if serializer.is_valid():
            serializer.save()                                            # Save it if valid
            return JsonResponse(serializer.data, status=201)     # Return back the data on success
        return JsonResponse(serializer.errors, status=400)     # Return back the errors  if not valid

@api_view(['GET'])
def lista_mensajes(request, **kwargs):
    user_id = get_user_id(request)
    receiver_id = kwargs['receiver_id']
    messages = Message.objects.filter(receiver_id=receiver_id).order_by('timestamp') & Message.objects.filter(sender_id=user_id) | Message.objects.filter(receiver_id=user_id).order_by('timestamp') & Message.objects.filter(sender_id=receiver_id)
    message_list = []
    for message in messages:
        message_dict = {
            'name': message.sender.name,
            'content': message.message
        }
        message_list.append(message_dict)

    return JsonResponse({'messages': message_list})

@api_view(['POST'])
def send_message(request, **kwargs):
    data = json.loads(request.body.decode('utf-8'))
    user_id = get_user_id(request)
    receiver_id = kwargs['receiver_id']
    sender=User.objects.get(id=user_id)
    receiver=User.objects.get(id=receiver_id)
    message_content = data.get('message')
    

    message = Message(sender=sender, receiver=receiver, message=message_content)
    message.save()
    # guardar el mensaje en la base de datos
       
    return JsonResponse({ 'Confirm': 'Message sended' })



@api_view(['GET'])
def lista_contactos(request):
    user_id = get_user_id(request)
    chats = Message.objects.filter(sender_id=user_id) | Message.objects.filter(receiver_id=user_id)
    contacts = set()
    for chat in chats:
        if chat.sender_id == user_id:
            contacts.add(chat.receiver_id)
        else:
            contacts.add(chat.sender_id)
    contact_data = []
    for contact_id in contacts:
        contact = {}
        contact['id'] = contact_id
        contact['name'] = User.objects.get(id=contact_id).name
        contact_data.append(contact)
    return JsonResponse({ 'contacts': contact_data }, safe=False)


