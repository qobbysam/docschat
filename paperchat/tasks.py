# tasks.py
from logging import getLogger
import json
from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from customuser.models import UserProfile
from .models import ChatTransaction
from .serializers import ChatTransactionSerializer

from .processor import ChatProcessor

logger = getLogger(__name__)

@shared_task
def process_chat_transaction(prompt_id,user_id,company_id):
    try:
        
        chat_transaction = ChatTransaction.objects.get(id=prompt_id)
        user_profile = UserProfile.objects.get(user__id=user_id)

        logger.info(user_profile)
        processor = ChatProcessor(userprofile=user_profile,transaction=chat_transaction)

        logger.info("starting consumption")
        response = processor.processchat()


        update_chat_status(prompt_id, user_id, company_id, response)

    except Exception as e:
        update_chat_status(prompt_id, user_id, company_id, response=None)

        logger.error(e)


@shared_task
def process_paper_chat_transaction(prompt_id,user_id,company_id):

    try:
        
        chat_transaction = ChatTransaction.objects.get(id=prompt_id)
        
        user_profile = UserProfile.objects.get(user__id=user_id)

        processor = ChatProcessor(userprofile=user_profile,transaction=chat_transaction)

        response = processor.processchat()

        #response = client.get_response()


        update_chat_status(prompt_id, user_id, company_id, response)

    except Exception as e:
        update_chat_status(prompt_id, user_id, company_id, response=None)

        logger.error(e)


def update_chat_status(prompt_id, user_id ,company_id, response):
    channel_layer = get_channel_layer()
    group_name = str(company_id) + str(user_id)
    msg = {}
    msg['message'] = {}

    transaction = ChatTransaction.objects.get(id=prompt_id)
    session = transaction.session

    session.unlock_session()
    # session.used = True

    # session.locked = False


    if  response:
        transaction.response = response['safestring']
        transaction.save()

        transaction_serializer = ChatTransactionSerializer(transaction)

        msg['message']['status'] = 0
        msg['message']['response'] = response
        msg['message']['transaction'] = transaction_serializer.data
        msg['message']['promptid'] = str(prompt_id)

    
    else:
        transaction_serializer = ChatTransactionSerializer(transaction)

        msg['message']['status'] = 1
        msg['message']['transaction'] = transaction_serializer.data
        msg['message']['response'] = response
        msg['message']['promptid'] = str(prompt_id)


    async_to_sync(channel_layer.group_send)(
    group_name,
    {
        'type': 'chat_message',
        'message': json.dumps(msg),
    }
)

