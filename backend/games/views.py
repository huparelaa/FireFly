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

from firefly.utils import get_user_id
    
@csrf_exempt
@api_view(['POST'])
def select_games(request): 
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    data = json.loads(request.body.decode('utf-8'))
    id_juego = data.get('id')
    print("id_juego", id_juego)
    game_list_select = []
    for id in id_juego: 
        game = Game.objects.filter(id_game = id)
        game_list_select.append(game.get().id)
    user.favorite_games.set(game_list_select)
    user.save()
        # Devolver una respuesta JSON con un mensaje de éxito
    return JsonResponse({'message': 'Juegos seleccionados guardados correctamente'})

@csrf_exempt
@api_view(['POST'])
def select_gamesRecommended(request): 
    try: 
        user_id = get_user_id(request)
        user = UserAccount.objects.get(id = user_id)
        data = json.loads(request.body.decode('utf-8'))
        id_juego = data.get('id')
        print(id_juego)
        user.favorite_games.set([id_juego])
        user.save()
        # Devolver una respuesta JSON con un mensaje de éxito
        return JsonResponse({'message': 'Juego seleccionado guardado correctamente'})
    except:
        return JsonResponse({'message': 'Juego ya guardado'})

def agregar_juegos(request):
    # Usa la API de RAWG para obtener información sobre los juegos
    response = requests.get('https://api.rawg.io/api/games?key=a6e0d61ecf5b4b66871ef58ce43806cd&page=2')
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
    return JsonResponse({'res': 'Se agregaron los juegos correctamente'}, safe = False)


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
            'game_profile': game.img
        }
        if(i != 3):
            response_data['juegos_populares'].append(game_data)
            i += 1
    return JsonResponse(response_data)

def recommended_games(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id=user_id)
    # Obtener los juegos más populares
    popular_games = Game.objects.annotate(num_users=Count('useraccount')).order_by('-num_users')
    most_played_games = []
    for game in popular_games:
        num_users = UserAccount.favorite_games.through.objects.filter(game_id = game.id_game).count()
        game.count = num_users  # Agregamos el atributo 'count' al objeto Game
        most_played_games.append(game)
    most_played_games_sorted = sorted(most_played_games, key=attrgetter('count'), reverse=True)
    print(most_played_games_sorted)
    user_games = user.favorite_games.all() 
    print('usergames', user_games)
    print('mostplayed',most_played_games_sorted)
    recommended_games = []
    for game in most_played_games_sorted:
        if game not in user_games:
            recommended_games.append(game)
        if len(recommended_games) == 5:
            break
    # Convertir los objetos Game a diccionarios para la respuesta JSON
    response_data = {'juegos_recomendados': []}
    for game in recommended_games:
        game_data = {
            'title': game.titulo,
            'id_game': game.id_game,
            'genero': game.genero,
            'img': game.img
        }
        response_data['juegos_recomendados'].append(game_data)
    return JsonResponse(response_data)