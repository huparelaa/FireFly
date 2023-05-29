import json
from django.core import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .models import UserAccount
from django.http import HttpResponse, JsonResponse
import jwt
from jwt.exceptions import InvalidSignatureError
from firefly.utils import verify_token, get_user_id
from google.cloud import storage
from friendlist.views import search_specific_friend
@api_view(['GET'])
def has_entered_before(request):
    
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id=user_id)
    has_entered = user.has_enter_before
    response_data = {'has_entered': has_entered}
    return JsonResponse(response_data)

@api_view(['POST'])
def has_entered_before_true(request): 
    
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    user.has_enter_before = True
    user.save()
    return JsonResponse({'message': 'Cambio realizado'}, safe=False)

@api_view(['GET'])
def get_user_profile(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    # MIRAR ESTO PARA AGREGARLO AL PERFIL DE USUARIO
    # favorite_games = [obj for obj in user.favorite_games.get(useraccount = user_id)]
    # print(favorite_games)
    # serializers_favorite_games = serializers.serialize('json', favorite_games)

    background_photo= None
    photo= None
    if(user.background_photo):
        background_photo = user.background_photo.url
    if(user.profile_photo):
        photo = user.profile_photo.url

    profile = {
        'name': user.name,
        'email': user.email,
        'age': user.age,
        'photo': photo,
        'background_photo': background_photo,
        'about_me': user.about_me,
        'intereses': user.intereses,
        'logros_y_trofeos': user.logros_y_trofeos
    }
    return JsonResponse(profile, safe = False)

@api_view(['GET'])
def user_games(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id=user_id)
    user_games = user.favorite_games.all() 
    response_data = {'juegos_favoritos': []}
    for game in user_games:
        # if len(response_data['juegos_favoritos']) >= 5:
        #     break            
        game_data = {
            'title': game.titulo,
            'id_game': game.id_game,
            'genero': game.genero,
            'img': game.img
        }
        response_data['juegos_favoritos'].append(game_data)
    return JsonResponse(response_data)

@api_view(['GET'])
def user_games_by_id(request, **kwargs):
    user_id = kwargs['user_id']
    user = UserAccount.objects.get(id=user_id)
    user_games = user.favorite_games.all() 
    response_data = {'juegos_favoritos': []}
    for game in user_games:
        # if len(response_data['juegos_favoritos']) >= 5:
        #     break            
        game_data = {
            'title': game.titulo,
            'id_game': game.id_game,
            'genero': game.genero,
            'img': game.img
        }
        response_data['juegos_favoritos'].append(game_data)
    return JsonResponse(response_data)

@api_view(['GET'])
def get_user_name_photo(request): 
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)

    photo = None
    if(user.profile_photo):
        photo = user.profile_photo.url

    photo_name = {
        'name': user.name, 
        'photo': photo,
    }
    return JsonResponse(photo_name)

@api_view(['POST'])
def change_user_info(request): 
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    data = json.loads(request.body.decode('utf-8'))
    name = data.get('name')
    age = data.get('age')
    about_me = data.get('about_me')
    interests = data.get('interests')
    achievements_and_trophies = data.get('achievements_and_trophies')
    if(name):
        user.name = name
    else:
        user.name = user.name
    if(about_me):
        user.about_me = about_me
    else:
        user.about_me = user.about_me
    if(age):
        user.age = age
    else:
        user.age = user.age
    if(interests):
        user.intereses = interests
    else:
        user.intereses = user.intereses
    if(achievements_and_trophies):
        user.logros_y_trofeos = achievements_and_trophies
    else:
        user.logros_y_trofeos = user.logros_y_trofeos
    user.save()
    return JsonResponse({ 'Confirm': 'Info changed succesfull' })


@api_view(['POST'])
def upload_profile_photo(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id=user_id)

    profile_photo_file = request.FILES.get('profile_photo')

    if profile_photo_file:
        if user.profile_photo:
            # Delete the existing profile photo
            user.profile_photo.delete(save=False)

        # Get the file extension
        extension = profile_photo_file.name.split('.')[-1]
        # Rename the file
        profile_photo_file.name = f"profile_photo.{extension}"

        # Save the renamed file to the user's profile_photo field
        user.profile_photo = profile_photo_file
        user.save()

    return JsonResponse({'Confirm': 'Profile photo uploaded successfully'})

@api_view(['POST'])
def upload_background_photo(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id=user_id)

    background_photo_file = request.FILES.get('background_photo')

    if background_photo_file:
        if user.background_photo:
            # Delete the existing background photo
            user.background_photo.delete(save=False)

        # Get the file extension
        extension = background_photo_file.name.split('.')[-1]
        # Rename the file
        background_photo_file.name = f"background_photo.{extension}"

        # Save the renamed file to the user's background_photo field
        user.background_photo = background_photo_file
        user.save()

    return JsonResponse({'Confirm': 'Background photo uploaded successfully'})

@api_view(['GET'])
def get_profile_photo_url(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id=user_id)

    if user.profile_photo:
        profile_photo_url = user.profile_photo.url
    else:
        profile_photo_url = None

    return JsonResponse({'profile_photo_url': profile_photo_url})


@api_view(['GET'])
def get_background_photo_url(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id=user_id)

    if user.background_photo:
        background_photo_url = user.background_photo.url
    else:
        background_photo_url = None

    return JsonResponse({'background_photo_url': background_photo_url})

def get_user_by_search(request):
    name = request.GET.get('name')
    if name:
        # TODO
        # MIRAR PARA QUE SOLO MANDE EL NOMBRE COMO TAL, Para QUE NO ENVIE TODOS LOS ELEMENTOS DEL USER XD
        users = UserAccount.objects.filter(name__icontains=name)
    data = {'users': list(users.values())}
    return JsonResponse(data)

@api_view(['POST'])
def get_user_by_id(request, **kwargs): 
    body = json.loads(request.body)
    amigo_id = body.get('id_friend')
    is_friend = search_specific_friend(request, amigo_id)
    user = UserAccount.objects.get(id=amigo_id)
    
    photo = None
    background_photo = None

    if(user.background_photo):
        background_photo = user.background_photo.url
    if(user.profile_photo):
        photo = user.profile_photo.url

    userInfo = {
        'name': user.name, 
        'age': user.age, 
        'email' : user.email,
        'about_me': user.about_me,
        'intereses': user.intereses,
        'logros_y_trofeos': user.logros_y_trofeos,
        'is_friend': is_friend,
        'photo': photo,
        'background_photo': background_photo,
    }
    return JsonResponse({'info': userInfo})


@api_view(['GET'])
def set_status_user(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    user.is_online = "true"
    user.save()
    return JsonResponse({'state': 'online', "state1": user.is_online})


@api_view(['GET'])
def logout_status(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    user.is_online = "false"
    user.save()
    return JsonResponse({'state': 'offline', "state1": user.is_online})