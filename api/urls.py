from django.urls import path

import pdfpaper.views_api as pdfviews
import paperchat.views_api as chatviews

urlpatterns = [
    
    path('topics/', pdfviews.PDFResourceListView.as_view(), name='api-titles'),
    path('reports/', pdfviews.ReportResourceListView.as_view(), name='api-reports'),
    path('upload/', pdfviews.FileUploadView.as_view(), name='api-upload'),
    path('search-pdf/', pdfviews.PDFResourceListView.as_view(), name='api-search-pdf'),
    path('send-prompt/', chatviews.SuperSendPrompt.as_view(), name='api-send-prompt' )



]
