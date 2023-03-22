from django.db import models

class Game(models.Model):
    id_game = models.IntegerField(blank = True)
    title = models.CharField(max_length = 250)
    img = models.CharField(max_length = 250)