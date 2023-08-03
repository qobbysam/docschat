from django.contrib import admin
from .models import PDFFile, ReportFile,PDFChunk
# Register your models here.


class PDFFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'doi', 'author_info', 'images')

admin.site.register(PDFFile, PDFFileAdmin)


class ReportAdmin(admin.ModelAdmin):
    list_display=('id', 'title')


class PDFChunkAdmin(admin.ModelAdmin):
    exclude = ["embedding"]

admin.site.register(ReportFile, ReportAdmin)

admin.site.register(PDFChunk, PDFChunkAdmin)