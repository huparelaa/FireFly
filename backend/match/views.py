from django.shortcuts import render
import jwt
import numpy as np
from accounts.models import UserAccount
from django.http import HttpResponse, JsonResponse
from sklearn.metrics.pairwise import cosine_similarity
from django.conf import settings
from jwt import InvalidSignatureError
from rest_framework.decorators import api_view
from firefly.utils import get_user_id
from games.models import Game    

def get_similar_users(user_profile):
    # Obtener todos los perfiles de usuario excepto el usuario actual
    other_profiles = UserAccount.objects.exclude(id=user_profile.id)
    # Crear una matriz de juegos favoritos para todos los usuarios
    user_profiles = [user_profile] + list(other_profiles)
    all_game_ids = list(Game.objects.values_list('id_game', flat=True))
    game_matrix = []
    for profile in user_profiles:
        game_ids = UserAccount.favorite_games.through.objects.filter(useraccount = profile).values_list('game_id', flat=True)
        game_matrix.append([1 if game_id in game_ids else 0 for game_id in all_game_ids])
    game_matrix = np.array(game_matrix)
    # Calcular las similitudes de coseno entre los perfiles de usuario
    similarity_matrix = cosine_similarity(game_matrix)
    # Obtener los usuarios más similares al usuario actual
    similar_users = [(other_profiles[i], similarity_matrix[0][i+1]) for i in range(len(other_profiles))]
    similar_users.sort(key=lambda x: x[1], reverse=True)

    return similar_users

@api_view(['GET'])
def match(request):
    user_id = get_user_id(request)
    user = UserAccount.objects.get(id = user_id)
    similar_users = get_similar_users(user)
    serialized_users = []
    for user, similarity in similar_users:
        serialized_user = {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'profile_photo': user.profile_photo,
            'age': user.age,
            'similarity': similarity,
        }
        if(similarity > 0):
            serialized_users.append(serialized_user)
    return JsonResponse({'similar_users': serialized_users})