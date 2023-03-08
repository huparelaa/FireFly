
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from games import views

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/games/', views.game_list, name='game_list'),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
