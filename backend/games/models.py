from django.db import models

class Game(models.Model):
    id_game = models.IntegerField(blank = True)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    ano_lanzamiento = models.PositiveIntegerField(default = None)
    genero = models.CharField(max_length=255)
    plataforma = models.CharField(max_length=255)
    img = models.CharField(max_length = 250)