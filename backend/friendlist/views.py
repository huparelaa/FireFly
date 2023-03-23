import json
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from jwt import InvalidSignatureError
import jwt

from rest_framework.decorators import api_view, permission_classes
from accounts.models import UserAccount
from .models import Amigo
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Amigo

def verify_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload
    except InvalidSignatureError:
        return None

@api_view(['GET'])
def get_friends(request):
    auth_header = request.headers.get('Authorization', None)
    if auth_header is None: 
        return HttpResponse(status=401)
    auth_parts = auth_header.split(' ')
    if len(auth_parts) != 2 or auth_parts[0] != 'JWT': 
        return HttpResponse(status=401)
    token = auth_parts[1]
    payload = verify_token(token)
    if payload is None: 
        return HttpResponse(status=401)
    user_id = payload.get('user_id', None)
    user = UserAccount.objects.get(id = user_id)
    friends = Amigo.objects.filter(usuario_id = user_id)
    amigos_data = []
    for friend in friends:
        amigo_data = friend.__dict__
        amigos_data.append(friend.amigo.name)
    return JsonResponse({ 'friends': amigos_data }, safe = False)

@api_view(['POST'])
def add_friend(request):
    auth_header = request.headers.get('Authorization', None)
    if auth_header is None: 
        return HttpResponse(status=401)
    auth_parts = auth_header.split(' ')
    if len(auth_parts) != 2 or auth_parts[0] != 'JWT': 
        return HttpResponse(status=401)
    token = auth_parts[1]
    payload = verify_token(token)
    if payload is None: 
        return HttpResponse(status=401)
    user_id = payload.get('user_id', None)
    user = UserAccount.objects.get(id = user_id)
    body = json.loads(request.body)
    amigo_id = body.get('user_id')
    amigo = get_object_or_404(UserAccount, id=amigo_id)
    creado = Amigo.objects.get_or_create(usuario=user, amigo=amigo)
    creado2 = Amigo.objects.get_or_create(usuario=amigo, amigo=user)
    return JsonResponse({'creado': 'Friend save'}, safe = False)


@api_view(['POST'])
def eliminar_amigo(request, amigo_id):
    auth_header = request.headers.get('Authorization', None)
    if auth_header is None: 
        return HttpResponse(status=401)
    auth_parts = auth_header.split(' ')
    if len(auth_parts) != 2 or auth_parts[0] != 'JWT': 
        return HttpResponse(status=401)
    token = auth_parts[1]
    payload = verify_token(token)
    if payload is None: 
        return HttpResponse(status=401)
    user_id = payload.get('user_id', None)
    user = UserAccount.objects.get(id = user_id)
    amigo = get_object_or_404(UserAccount, id=amigo_id)
    Amigo.objects.filter(usuario=user, amigo=amigo).delete()
    return JsonResponse({'eliminado': True})