from django.db import models
from djongo import models as djongo_models

class Game(djongo_models.Model):
    title = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    description = models.TextField()
    poster = models.ImageField(upload_to='posters')




