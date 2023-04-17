import json
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from jwt import InvalidSignatureError
import jwt

from rest_framework.decorators import api_view, permission_classes
from accounts.models import UserAccount
from firefly.utils import get_user_id
from .models import Amigo
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Amigo
from accounts.models import UserAccount

@api_view(['GET'])
def get_friends(request):
    user_id = get_user_id(request)
    friends = Amigo.objects.filter(usuario_id=user_id)
    amigos_data = []
    if friends:
        for friend in friends:
            amigo = UserAccount.objects.get(id=friend.amigo_id)
            amigos_data.append((amigo.name, amigo.id, amigo.email))
    
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
def eliminar_amigo(request, amigo_id):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    amigo = get_object_or_404(UserAccount, id=amigo_id)
    Amigo.objects.filter(usuario=user, amigo=amigo).delete()
    return JsonResponse({'eliminado': True})