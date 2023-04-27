from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from games.models import Game


class UserAccountManager(BaseUserManager): 
    def create_user(self, email, name, password = None):
        if not email: 
            raise ValueError('User must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save()
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin, models.Model):
    email = models.EmailField(max_length = 255, unique = True)
    name = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)
    has_enter_before = models.BooleanField(default = False)
    favorite_games = models.ManyToManyField(Game, symmetrical=False)
    profile_photo = models.CharField(max_length = 250, default = "")
    age = models.IntegerField(blank = True)
    about_me = models.TextField(max_length = 1000, blank = True)
    intereses = models.TextField(max_length = 1000, blank = True)
    logros_y_trofeos = models.TextField(max_length = 1000, blank = True)   


    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self): 
        return self.name
    
    def get_short_name(self): 
        return self.name
    
    def __str__(self):
        return self.email

