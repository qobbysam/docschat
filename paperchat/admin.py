from django.contrib import admin

from .models import ChatSession, ChatTransaction
# Register your models here.

admin.site.register(ChatSession)
admin.site.register(ChatTransaction)