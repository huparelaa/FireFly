from django.db import models
from accounts.models import UserAccount

# Create your models here.

class FriendList(models.Model):
    user = models.OneToOneField(UserAccount, on_delete = models.CASCADE, related_name = "user")
    friends = models.ManyToManyField(UserAccount, blank = True, related_name = "friends")

    def __str__(self):
        return self.user.name
    
    def add_friend(self, account):
        if not account in self.friends.all():
            self.friends.add(account)
    
    def remove_friends(self, account): 
        if account in self.friends.all():
            self.friends.remove(account)

    def unfriend(self, removee): 
        remover_friends_list = self
        remover_friends_list.remove_friends(removee)
        friends_list = FriendList.objects.get(user = removee)
        friends_list.remove_friends(self.user)

    def is_mutual_friend(self, friend):
        if friend in self.friends.all():
            return True
        return False

class FriendRequest(models.Model): 
    sender = models.ForeignKey(UserAccount, on_delete = models.CASCADE, related_name = "sender")
    receiver = models.ForeignKey(UserAccount, on_delete = models.CASCADE, related_name = "receiver")
    is_active = models.BooleanField(blank = True, null= False, default = True)
    timestamp = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.sender.email

    def accept(self): 
        """
        Accept a friend request
        Update both SENDER and RECEIVER friend lists 
        """
        receiver_friend_list = FriendList.objects.get(user = self.receiver)
        if receiver_friend_list:
            receiver_friend_list.add_friend(self.sender)
            sender_friend_list = FriendList.objects.get(user = self.sender)
            if sender_friend_list: 
                sender_friend_list.add_friend(self.receiver)
                self.is_active = False
                self.save()
    
    def decline(self): 
        """
        Decline a friend request
        Is it "declined" by setting the "is_active" field to False
        """
        self.is_active = False
        self.save()
    
    def cancel(self): 
        """
        Cancel a friend request
        It is "cancelled" by setting the "is_active" field to false
        This is only different with respect to "declining" through the notification
        that is generated 
        """
        self.is_active = False
        self.save()




class Amigo(models.Model):
    usuario = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='amigos')
    amigo = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='amigos_de')

    class Meta:
        unique_together = ('usuario', 'amigo')