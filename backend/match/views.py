from django.shortcuts import get_object_or_404, render
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
import json
from match.models import Match
def get_similar_users(user_profile):
    matched_users = Match.objects.filter(usuario=user_profile).values_list('user_matched', flat=True)
    other_profiles = UserAccount.objects.exclude(id__in=[user_profile.id] + list(matched_users))
    # Crear una matriz de juegos favoritos para todos los usuarios
    user_profiles = [user_profile] + list(other_profiles)
    all_game_ids = list(Game.objects.values_list('id', flat=True))
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
    count = 0
    for user, similarity in similar_users:
        if similarity >= 0 and count < 3:
            photo= None
            if(user.profile_photo):
                photo = user.profile_photo.url
            serialized_user = {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'photo': photo,
                'age': user.age,
                'similarity': similarity,
            }
            serialized_users.append(serialized_user)
            count += 1
    return JsonResponse({'similar_users': serialized_users})

@api_view(['POST'])
def doMatch(request):
    try:
        user_id = get_user_id(request)
        body = json.loads(request.body)
        amigo_id = body.get('user_id')
        user = UserAccount.objects.get(id=user_id)
        amigo = get_object_or_404(UserAccount, id=amigo_id)
        match = Match(usuario = user, user_matched = amigo,match_successful=True)
        match.save()
    except:
        return JsonResponse({'Error':'Match already saved'})
   
    return JsonResponse({ 'Confirm': 'Match done with: '+ amigo.name })

@api_view(['POST'])
def blockMatch(request):
    try:
        user_id = get_user_id(request)
        body = json.loads(request.body)
        amigo_id = body.get('user_id')
        user = UserAccount.objects.get(id=user_id)
        amigo = get_object_or_404(UserAccount, id=amigo_id)
        match = Match(usuario = user, user_matched = amigo, match_successful=False)
        match.save()
    except:
        return JsonResponse({'Error':'Match already saved'})
   
    return JsonResponse({ 'Confirm': 'Match blocked with: '+ amigo.name })

@api_view(['GET'])
def getLastThreeMatches(request):
    user_id = get_user_id(request)
    matches = Match.objects.filter(usuario=user_id).order_by('id')[::-1]
    matches_data = []
    if matches:
        for match in matches:

            try:       
                if not len(matches_data) >= 3:          
                    amigo = UserAccount.objects.get(id=match.user_matched.id)
                    if match.match_successful:
                        matches_data.append((amigo.name, amigo.id, amigo.email))
            except UserAccount.DoesNotExist:
                continue
    
    return JsonResponse({ 'matches': matches_data }, safe=False)


@api_view(['GET'])
def getMatches(request):
    user_id = get_user_id(request)
    matches = Match.objects.filter(usuario=user_id)# Obtener solo los últimos 3 partidos
    matches_data = []
    if matches:
        for match in matches:
            try:                
                amigo = UserAccount.objects.get(id=match.user_matched.id)
                matches_data.append((amigo.name, amigo.id, amigo.email,match.match_successful))
            except UserAccount.DoesNotExist:
                continue
    
    return JsonResponse({ 'matches': matches_data }, safe=False)
