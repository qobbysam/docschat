from rest_framework import serializers

from .models import PDFFile, ReportFile

class PDFFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFFile
        fields = ["id", "title", "status", "file"]


class ReportFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReportFile
        fields = ["id", "title", "ready", "status"]

