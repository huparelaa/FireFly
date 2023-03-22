from django.db import models
from accounts.models import UserAccount

# Create your models here.

class Amigo(models.Model):
    usuario = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='amigos')
    amigo = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='amigos_de')

    class Meta:
        unique_together = ('usuario', 'amigo')