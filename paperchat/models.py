from django.db import models

from django.contrib.auth.models import User
from company.models import CompanyModel
# Create your models here.
memory_choices = (
    ("fullhistory", "fullhistory"),
    ("mostrecent", "mostrecent")
)

mode_choices = (
    ("general", "general"),
    ("science", "science"),
    ("law", "law")
)
class ChatSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    company = models.ForeignKey(CompanyModel, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(blank=True, null=True, max_length=255)
    used = models.BooleanField(default=False)
    locked = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    initmode = models.TextField(blank=True, null=True)
    mode = models.CharField(choices=mode_choices,blank=True, null=True, max_length=50)
    selected = models.TextField(blank=True, null=True)
    history_summary = models.TextField(blank=True, null=True)
    memory = models.CharField(choices=memory_choices, blank=True, null=True, max_length=25)
    last_response_is_chain = models.BooleanField(default=False)
    

    def __str__(self) -> str:
        return "{}: ".format(self.id, self.title)
    
    def lock_session(self):
        self.locked = True
        self.save()

    def unlock_session(self):
        self.locked = False
        self.save()

    def update_used(self):
        self.used = True
        self.save()

    class Meta:
        ordering = ['-created']

class ChatTransaction(models.Model):
    prompt = models.TextField(blank=True, null=True)
    response = models.TextField(blank=True, null=True)
    mode = models.TextField(blank=True, null=True)
    selected=models.TextField(blank=True, null=True)
    session = models.ForeignKey(ChatSession, on_delete=models.SET_NULL, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    role = models.CharField(max_length=20, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    sources = models.TextField(blank=True, null=True)
    thought = models.TextField(blank=True, null=True)
    is_chain_response = models.BooleanField(default=False)
    extra = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return "{}".format(self.id)
    
    class Meta:
        ordering = ['-created']
 