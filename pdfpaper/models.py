from django.db import models
from company.models import CompanyModel
from pgvector.django import VectorField

# Create your models here.

status_choices = (
    ('STARTED', 'STARTED'),
    ('PROCESSING', 'PROCESSING'),
    ('COMPLETE', 'COMPLETE'),
    ('ERROR', 'ERROR')
)

pdf_choices = (
    ('SCIENCE', 'SCIENCE'),
    ('LAW', 'LAW'),
    ('OTHER', 'OTHER')
)

class PDFFile(models.Model):
    file = models.FileField(upload_to='public/pdf_files/')
    title = models.CharField(blank=True, null=True, max_length=255)
    text = models.TextField(blank=True)
    doi = models.CharField(blank=True,null=True, max_length=255)
    meta_info = models.TextField(blank=True)
    author_info = models.TextField(blank=True)
    images = models.TextField(blank=True)
    complete = models.BooleanField(default=False)
    processed_at = models.DateTimeField(auto_now_add=True)
    citation = models.TextField(blank=True)
    relationship_data= models.TextField(blank=True)
    vector_data = models.TextField(blank=True)
    status = models.CharField(choices=status_choices,blank=True)
    company = models.ForeignKey(CompanyModel, on_delete=models.SET_NULL, null=True, blank=True)
    pdf_type = models.CharField(max_length=25, choices=pdf_choices, null=True)
    keywords = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.id}: {self.title}'
    

class ReportFile(models.Model):
    file = models.FileField(upload_to="public/report_files/")
    title = models.CharField(blank=True, null=True, max_length=255)
    ready = models.BooleanField(default=False)
    status = models.CharField(choices=status_choices,blank=True)
    company = models.ForeignKey(CompanyModel, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self) -> str:
        return "{}".format(self.title)
    


class PDFChunk(models.Model):
    pdf = models.ForeignKey(PDFFile, on_delete=models.CASCADE, null=True, blank=True)
    text = models.TextField(blank=True, null=True)
    page_number = models.IntegerField(blank=True, null=True)
    keywords = models.TextField(blank=True, null=True)
    embedding = VectorField(dimensions=1536)
    

    def __str__(self) -> str:
        return "{}".format(self.pdf.title)