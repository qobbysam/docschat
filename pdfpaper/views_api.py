
import json

from django.contrib.postgres.search import SearchVector
from django.db.models import Q

from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from customuser.models import UserProfile
from .models import PDFFile, ReportFile
from .serializers import PDFFileSerializer
from .tasks import process_pdf_file


class PDFPaginator(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
class PDFResourceListView(generics.ListAPIView):

    serializer_class = PDFFileSerializer
    pagination_class = PDFPaginator
    def get_queryset(self):
        query_string = self.request.GET.get("q")
        userprofile = UserProfile.objects.get(user=self.request.user) 
        queryset = PDFFile.objects.annotate(search=SearchVector("title", "text"))

        print(query_string)
        if query_string:
            search_queries = query_string.split(',')
            filters = Q()

            for search_query in search_queries:
                field, value = search_query.split(':', 1)
                if '__in' in field:
                    field_name = field.split('__')[0]
                    values = value.split('|')
                    filters &= Q(**{f"{field_name}__in": values})
                else:
                    # Use icontains for case-insensitive search
                    filters |= Q(**{f"{field}__icontains": value})

            queryset = queryset.filter(filters)

        return queryset.filter(company=userprofile.company)
    

class ReportPaginator(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
class ReportResourceListView(generics.ListAPIView):

    serializer_class = PDFFileSerializer
    pagination_class = ReportPaginator
    def get_queryset(self):
        query = self.request.GET.get("q")
        userprofile = ReportFile.objects.get(user=self.request.user) 
        queryset = ReportFile.objects.annotate(search=SearchVector("title", "text"))
        
        if query and query != "":
            queryset = queryset.filter(search=query)
        
        return queryset.filter(company=userprofile.company)
    

class FileUploadView(generics.CreateAPIView):
    

    def post(self, request):
        
        files = request.FILES.getlist('files')
        userprofile = UserProfile.objects.get(user=request.user)
        company = userprofile.company
        filetype = request.POST.get('filetype')
        response_data = []
        print("company:  {}".format(company))
        for file in files:
            # Save the uploaded file in the PDFFile model

            pdf_file = PDFFile.objects.create(
                file=file, 
                company=company,
                pdf_type=filetype
                )
            
            # Get the file path
            file_id = pdf_file.id
            name = str(pdf_file.file.name)

            response_obj = {
                'fileid': str(file_id),
                'name': name.split("/")[-1],
                'status': "processing"
            }
            response_data.append(response_obj)
            # Start the asynchronous task to process the file
            #vars change
            process_pdf_file.delay(file_id, company.id)

        return Response({'data': json.dumps(response_data)})
        #return JsonResponse({'data': json.dumps(response_data)})
