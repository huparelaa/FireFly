from django.http import JsonResponse
from .models import Game

def game_list(request):
    games = Game.objects.all().values('id', 'title', 'poster')
    data = list(games)
    return JsonResponse(data, safe=False)