import json
from django.core import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .models import UserAccount
from django.http import HttpResponse, JsonResponse
import jwt
from jwt.exceptions import InvalidSignatureError


def verify_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload
    except InvalidSignatureError:
        return None

@api_view(['GET'])
def has_entered_before(request):
    auth_header = request.headers.get('Authorization', None)
    if auth_header is None:
        return HttpResponse(status=401)
    # Verificar que el token tiene el formato correcto
    auth_parts = auth_header.split(' ')
    if len(auth_parts) != 2 or auth_parts[0] != 'JWT':
        return HttpResponse(status=401)
    # Obtener el token JWT de la segunda parte del header Authorization
    token = auth_parts[1]
    # Verificar la firma del token
    payload = verify_token(token)
    if payload is None:
        # Handle invalid token
        return HttpResponse(status=401)
    # Obtener el ID de usuario del payload del token
    user_id = payload.get('user_id', None)
    user = UserAccount.objects.get(id=user_id)
    has_entered = user.has_enter_before
    response_data = {'has_entered': has_entered}
    return JsonResponse(response_data)

@api_view(['POST'])
def has_entered_before_true(request): 
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
    user.has_enter_before = True
    user.save()
    return JsonResponse({'message': 'Cambio realizado'}, safe=False)

@api_view(['GET'])
def get_user_profile(request):
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
    # MIRAR ESTO PARA AGREGARLO AL PERFIL DE USUARIO
    # favorite_games = [obj for obj in user.favorite_games.get(useraccount = user_id)]
    # print(favorite_games)
    # serializers_favorite_games = serializers.serialize('json', favorite_games)
    profile = {
        'name': user.name,
        'email': user.email,
        'age': user.age,
        'photo': user.profile_photo,
        'about_me': user.about_me
    }
    return JsonResponse(profile, safe = False)

@api_view(['GET'])
def get_user_name_photo(request): 
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
    photo_name = {
        'name': user.name, 
        'photo': user.profile_photo,
    }
    return JsonResponse(photo_name)

@api_view(['POST'])
def change_user_info(request): 
    # Tomar JWT de los headers que se envian y sacarle el id
    auth_header = request.headers.get('Authorization', None)
    if auth_header is None: 
        return HttpResponse(status=401)
    auth_parts = auth_header.split(' ')
    if len(auth_parts) != 2 or auth_parts[0] != 'JWT': 
        return HttpResponse(status=401)
    token = auth_parts[1]
    # Decodificar el token
    payload = verify_token(token)
    if payload is None: 
        return HttpResponse(status=401)
    user_id = payload.get('user_id', None)
    user = UserAccount.objects.get(id = user_id)
    data = json.loads(request.body.decode('utf-8'))
    name = data.get('name')
    age = data.get('age')
    about_me = data.get('about_me')
    user.name = name
    user.about_me = about_me
    user.age = age
    user.save()
    return JsonResponse({ 'Confirm': 'Info changed succesfull' })

def get_user_by_search(request):
    name = request.GET.get('name')
    if name:
        users = UserAccount.objects.filter(name__icontains=name)
    else:
        users = UserAccount.objects.all()
    data = {'users': list(users.values())}
    return JsonResponse(data)

def get_user_by_id(request, **kwargs): 
    user_id = kwargs['user_id']
    user = UserAccount.objects.get(id=user_id)
    userInfo = {
        'name': user.name, 
        'age': user.age, 
        'email' : user.email,
        'about_me': user.about_me
    }
    return JsonResponse({'info': userInfo})