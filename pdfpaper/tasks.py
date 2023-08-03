# tasks.py
import io
import json
from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from fileconsumer.consumer import PDFFileConsumer

from .models import PDFFile





@shared_task
def process_pdf_file(file_id,company_id):
    # Extract text from the PDF file using pdf etl

    processor = PDFFileConsumer(file_id)

    report = processor.process_pdf()

    update_processing_status( file_id,company_id,report)

def update_processing_status(file_id,company_id, report):
    channel_layer = get_channel_layer()
    group_name = str(company_id)

    msg = {}
    msg['fileid'] = str(file_id)
    msg['status'] = report['status']
    msg['message'] = report['message']

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            'type': 'file_upload_update',
            'message': json.dumps(msg)
        }
    )



# @shared_task
# def generate_report(topic,numsections,layers,report_id,company_id):

#     generator = ReportGenerator(company_id=company_id, report_id=report_id, action=update_report_status)
    
#     generator.generate_report(topic,numsections, layers) 

# def update_report_status(report_id, company_id, message):
#     channel_layer = get_channel_layer()
#     group_name = str(company_id)
#     #processing_status[group_name] = (passage_name, status)

#     msg = {}
   
#     msg['message'] = message
#     msg['message']['reportid'] = str(report_id)
#     async_to_sync(channel_layer.group_send)(
#         group_name,
#         {
#             'type': 'report_status_update',
#             'message': json.dumps(msg),
#         }
#     )

# def convert_to_stream(file):
#     # Read the file content
#     file_content = file.read()

#     # Create a stream from the file content
#     stream = io.BytesIO(file_content)

#     return stream