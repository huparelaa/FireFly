import json
from django.http import HttpResponse, JsonResponse
from jwt import InvalidSignatureError
import jwt
from accounts.models import UserAccount
from django.conf import settings
from accounts.models import Game
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

def verify_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload
    except InvalidSignatureError:
        # Handle invalid signature
        return None
    
@csrf_exempt
@api_view(['POST'])
def select_games(request): 
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
    print('user', user)
    data = json.loads(request.body.decode('utf-8'))
    title = data.get('title')
    print('title', title)
    id_juego = data.get('id')
    print('id_juego:', id_juego, type(id_juego))
    game_list = list(id_juego)
    user.favorite_games.set(game_list)
    user.save()
        # Devolver una respuesta JSON con un mensaje de éxito
    return JsonResponse({'message': 'Juegos seleccionados guardados correctamente'})