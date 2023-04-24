import json
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.decorators import api_view
from accounts.models import UserAccount
from firefly.utils import get_user_id
from .models import Amigo
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Amigo
from accounts.models import UserAccount

@api_view(['GET'])
def get_friends(request):
    user_id = get_user_id(request)
    friends = Amigo.objects.filter(usuario_id=user_id)
    print('user_id', user_id)
    print('friends', friends)
    amigos_data = []
    if friends:
        for friend in friends:
            try:                
                amigo = UserAccount.objects.get(id=friend.amigo_id)
                print('amigo', amigo)
                amigos_data.append((amigo.name, amigo.id, amigo.email))
            except UserAccount.DoesNotExist: 
                continue
    
    return JsonResponse({ 'friends': amigos_data }, safe=False)

@api_view(['POST'])
def add_friend(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    body = json.loads(request.body)
    amigo_id = body.get('user_id')
    amigo = get_object_or_404(UserAccount, id=amigo_id)
    creado = Amigo.objects.get_or_create(usuario=user, amigo=amigo)
    creado2 = Amigo.objects.get_or_create(usuario=amigo, amigo=user)
    return JsonResponse({'creado': 'Friend save'}, safe = False)

@api_view(['POST'])
def delete_friend(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    body = json.loads(request.body)
    amigo_id = body.get('user_id')
    amigo = get_object_or_404(UserAccount, id=amigo_id)
    Amigo.objects.filter(usuario=user, amigo=amigo).delete()
    return JsonResponse({'eliminado': True})

@api_view(['POST'])
def block_friend(request): 
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    body = json.loads(request.body)
    amigo_id = body.get('user_id')
    amigo = get_object_or_404(UserAccount, id=amigo_id)
    data_friend = Amigo.objects.get(usuario = user, amigo = amigo)
    data_friend.estado = 'block'
    return JsonResponse({'bloqueado': True})

def get_friends_state(request): 
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    body = json.loads(request.body)
    amigo_id = body.get('user_id')
    amigo = get_object_or_404(UserAccount, id=amigo_id)
    data_friend = Amigo.objects.get(usuario = user, amigo = amigo)
    return JsonResponse({ data_friend.estado })