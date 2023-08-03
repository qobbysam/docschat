# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer


''' This is a worker used by django channels. The path defined in asgi.py 
    runs this worker.
'''
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        group = self.scope['url_route']['kwargs']['company_id']
        user = self.scope['url_route']['kwargs']['user_id']
        group_name = str(group) + str(user)
        self.group_name = group_name
        await self.channel_layer.group_add(group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        group = self.scope['url_route']['kwargs']['company_id']
        user = self.scope['url_route']['kwargs']['user_id']
        group_name = str(group) + str(user)
        await self.channel_layer.group_discard(group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        action = text_data_json.get('type')
        message = text_data_json.get('message')


        

        await self.channel_layer.group_send(
            self.group_name, {"type": "chat_message", "message": message}
        )

    

    

    async def chat_message(self, event):
        message = event["message"]
        type_ = event["type"]
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message, "type": type_}))