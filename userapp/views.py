from django.shortcuts import render

from django.views import View
from django.views.generic import TemplateView
# Create your views here.

class DashboardView(TemplateView):
    template_name = "userapp/dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["section message"] = "loaded section message"
        return context
    

class GeneralChatView(TemplateView):

    template_name = "userapp/chat.html"


class ScienceChatView(TemplateView):

    template_name = "userapp/chat_science.html"

class LawChatView(TemplateView):

    template_name = "userapp/chat_law.html"
    
class ReportsView(TemplateView):

    template_name = "userapp/reports.html"

class UploadView(TemplateView):

    template_name = "userapp/upload.html"