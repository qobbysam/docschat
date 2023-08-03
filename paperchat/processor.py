
import json
from logging import getLogger
from langchaintool.client import  PaperSuperClient

from .models import ChatSession, ChatTransaction

from pdfpaper.models import PDFFile


logger = getLogger(__name__)

class ChatProcessor:
     def __init__(self, userprofile, transaction) -> None:
          self.transaction = transaction
          self.client = PaperSuperClient()
          self.userprofile = userprofile
         
    
     def processchat(self):

          history = self.get_history()
          
          if self.transaction.mode == "free":
               response = self.get_response(history)
               #self.update_session_summary(response)

          elif self.transaction.mode == "paper":
               
               logger.info("starting paper")
               search_in = self.get_vector_search_in()
               
               response = self.get_response( history=history, only=search_in)

               #self.update_session_summary(response)               
          else:
               
               response = None


          return response

     def get_history(self):
          session = self.transaction.session
          previous = list(ChatTransaction.objects.filter(session=session).exclude(id=self.transaction.id).order_by("created"))        
          history = [(x.prompt, x.response) for x in previous]
          return history

     def get_vector_search_in(self):
          selected = json.loads(self.transaction.selected)

          to_use = []
          for v in selected:
               pdf = PDFFile.objects.get(id=v["id"])
               to_use.append(pdf)
          return to_use



     
     def get_response(self, history, only=None):
          
          client_response = self.client.send_message(
               userprofile=self.userprofile, 
               transaction=self.transaction,
               history=history, only=only
               )
          
          response = self.process_client_response(client_response)

          return response

     def process_client_response(self, response):
          
          success = response.get('message', None)
          error = response.get('error', None)
          sources = response.get('sources', None)
          response = {}
          if success:     
               response['safestring'] = success
          elif error:
               response['safestring'] = error
          
          else:
               response['safestring'] = "unknown error occured"
               return None
          
          if sources is not None:

               self.save_sources(sources=sources)
          
          return response
     
     def update_session_summary(self, response):

          summary =  response.get("new_summary", None)
          print(response)

          session = self.transaction.session 

          if summary:

               session.history_summary = summary
               session.save()

     def save_sources(self, sources):
          item_dict = [x.__dict__ for x in sources]

          source_string = json.dumps(item_dict)
          
          self.transaction.sources = source_string
          self.transaction.save()


