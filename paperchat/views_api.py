
import json
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status

from customuser.models import UserProfile
from .models import ChatSession, ChatTransaction
from .serializers import ChatSessionSerializer, ChatTransactionSerializer, ChatPromptSerializer
from .tasks import process_chat_transaction

class NewSession(APIView):

    
    def clean_up_init(self, response, last_object):

        pass

    def get_last_object(self, user, company):
        last_object = ChatSession.objects.filter(user=user, used=False, company=company).last()
    
        if last_object is None:
            last_object = ChatSession.objects.create(user=user, company=company, used=False, locked=False)

        
        return last_object


    def get(self,request):
        try:
            userprofile = UserProfile.objects.get(user=request.user)
            chatsession = self.get_last_object(userprofile.user, userprofile.company)
            serializer = ChatSessionSerializer(chatsession)
            return Response(serializer.data)
        
        except Exception as e:
            print(e)
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
    
class RecentSessions(ListAPIView):
    serializer_class = ChatSessionSerializer

    def get_queryset(self):
        userprofile = UserProfile.objects.get(user = self.request.user)
        queryset = ChatSession.objects.filter(user=userprofile.user, company=userprofile.company)
        return queryset
    

class SuperSendPrompt(APIView):

    def post(self, request):

        serializer = ChatPromptSerializer(data=request.data)

        if serializer.is_valid():
            userprofile = UserProfile.objects.get(user = self.request.user)

            session = ChatSession.objects.get(id=serializer.validated_data.get('session'))
            
            selected = json.dumps(serializer.validated_data.get("selected",  None))

            extra = serializer.validated_data.get("extra", None)

            prompt = serializer.validated_data.get("prompt")

            mode = serializer.validated_data.get("mode")

            transaction = ChatTransaction.objects.create(
                prompt = prompt,
                session = session,
                mode = mode,
                extra = json.dumps(extra),
                selected = selected

            )

            session.mode = serializer.validated_data.get('mode')
            session.selected = selected

            if extra is not None:
                memory = extra.get("memory", None)
            
                if memory :
                    session.memory = memory
                
            session.save()
            response_serializer = ChatTransactionSerializer(transaction)
            
            process_chat_transaction.delay(
                prompt_id= transaction.id,
                user_id = request.user.id,
                company_id = userprofile.company.id
            )
            session.update_used()

            session.lock_session()


            
            return Response(response_serializer.data, status=201)



class SessionChatHistory(ListAPIView):
    serializer_class = ChatTransactionSerializer

    def get_queryset(self):
        session_id = self.kwargs.get('session_id')
        session = ChatSession.objects.get(id=session_id)
        queryset = ChatTransaction.objects.filter(session=session).order_by('created')

        return queryset