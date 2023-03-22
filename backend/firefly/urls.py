from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts import views as vAccounts
from games import views as vGames
from friendlist import views as vFriendList
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # path('api/games/', vGames.game_list, name='game_list'),
    path('user/has_entered_before/', vAccounts.has_entered_before, name='has_entered_before'),
    path('user/has_entered_before_true/', vAccounts.has_entered_before_true, name='has_entered_before_true'), 
    path('api/games_selected', vGames.select_games, name='select_games'),
    path('api/profile', vAccounts.get_user_profile, name = 'get_user_profile'),
    path('api/get_name_photo', vAccounts.get_user_name_photo, name = "get_user_photo"),
    path('api/get_friends', vFriendList.get_friends, name = "get_friends"), 
    path('api/profile/change_info', vAccounts.change_user_info, name = "change_user_info" ), 
    path('search/', vAccounts.get_user_by_search, name='search_users'),
    
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
