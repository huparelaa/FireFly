import json
from operator import attrgetter
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from jwt import InvalidSignatureError
import jwt
import requests
from accounts.models import UserAccount
from django.conf import settings
from accounts.models import Game
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.db.models import Count

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
    data = json.loads(request.body.decode('utf-8'))
    id_juego = data.get('id')
    game_list = list(id_juego)
    user.favorite_games.set(game_list)
    user.save()
        # Devolver una respuesta JSON con un mensaje de éxito
    return JsonResponse({'message': 'Juegos seleccionados guardados correctamente'})



def agregar_juegos(request):
    # Usa la API de RAWG para obtener información sobre los juegos
    response = requests.get('https://api.rawg.io/api/games?key=a6e0d61ecf5b4b66871ef58ce43806cd')
    data = response.json()
    # Crea instancias del modelo Juego con la información obtenida y guárdalas en la base de datos
    for juego_data in data['results']:
        juego = Game(
            id_game=juego_data['id'],
            titulo=juego_data['name'],
            genero=juego_data['genres'][0]['name'],
            img=juego_data['background_image']
        )
        juego.save()
    # Retorna una respuesta indicando que se agregaron los juegos correctamente
    return JsonResponse({'Se agregaron los juegos correctamente'}, safe = False)


def more_played_games(request): 
    popular_games = Game.objects.annotate(num_users=Count('useraccount')).order_by('-num_users')
    most_played_games = []
    for game in popular_games:
        num_users = UserAccount.favorite_games.through.objects.filter(game_id = game.id_game).count()
        game.count = num_users  # Agregamos el atributo 'count' al objeto Game
        most_played_games.append(game)

    most_played_games_sorted = sorted(most_played_games, key=attrgetter('count'), reverse=True)

    # Convertimos los objetos Game a diccionarios para la respuesta JSON
    response_data = {'juegos_populares': []}
    i = 0
    for game in most_played_games_sorted:
        game_data = {
            'title': game.titulo,
            'id_game': game.id_game,
            'genero': game.genero,
            'count': game.count,
        }
        if(i != 3):
            response_data['juegos_populares'].append(game_data)
            i += 1
    return JsonResponse(response_data)

