from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from games.models import Game

def upload_to(instance, filename):
    user_id = instance.id
    return 'users/{user_id}/{filename}'.format(user_id=user_id, filename=filename)

class UserAccountManager(BaseUserManager): 
    def create_user(self, email, name, lastname, password = None):
        if not email: 
            raise ValueError('User must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, lastname = lastname)
        user.set_password(password)
        user.save()
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin, models.Model):
    email = models.EmailField(max_length = 255, unique = True)
    name = models.CharField(max_length = 50)
    lastname = models.CharField(max_length= 50, default = "")
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)
    has_enter_before = models.BooleanField(default = False)
    favorite_games = models.ManyToManyField(Game, symmetrical=False)
    profile_photo = models.ImageField(upload_to=upload_to, blank=True, null=True)
    background_photo = models.ImageField(upload_to=upload_to, blank=True, null=True)
    age = models.IntegerField(blank = True)
    about_me = models.TextField(max_length = 1000, blank = True)
    intereses = models.TextField(max_length = 1000, blank = True)
    logros_y_trofeos = models.TextField(max_length = 1000, blank = True)   
    is_online = models.CharField(max_length=15, default="false")

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'lastname']

    def get_full_name(self): 
        return self.name
    
    def get_short_name(self): 
        return self.name
    
    def __str__(self):
        return self.email

