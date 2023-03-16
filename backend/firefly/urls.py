from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts import views as vAccounts
from games import views as vGames
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # path('api/games/', vGames.game_list, name='game_list'),
    path('user/has_entered_before/', vAccounts.has_entered_before, name='has_entered_before'),
    path('user/has_entered_before_true/', vAccounts.has_entered_before_true, name='has_entered_before_true'), 
    path('api/games_selected', vGames.select_games, name='select_games')
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
