
from rest_framework import serializers
from .models import Game, PreferencesGames

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class FavoriteGamesSerializer(serializers.ModelSerializer):
    movie = GameSerializer(read_only=True)

    class Meta:
        model = PreferencesGames
        fields = '__all__'