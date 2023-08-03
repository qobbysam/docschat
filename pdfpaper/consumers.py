# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer


''' This is a worker used by django channels. The path defined in asgi.py 
    runs this worker.
'''
class ProcessingStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        group = self.scope['url_route']['kwargs']['company_id']
        self.group_name = group
        await self.channel_layer.group_add(group, self.channel_name)
        # async_to_sync(self.channel_layer.group_add)(
        #     group, self.channel_name
        # )
        await self.accept()

                # Send current processing status to the newly connected client
        # current_status = processing_status.get(group)
        # if current_status:
        #         await self.send(text_data=json.dumps({"type": "file_upload_update", "message": current_status[0]}))

    async def disconnect(self, close_code):
        group = self.scope['url_route']['kwargs']['company_id']
        await self.channel_layer.group_discard(group, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        action = text_data_json.get('type')
        message = text_data_json.get('message')

        print(text_data_json)
        if action == "file_upload_update":
            await self.channel_layer.group_send(
            self.group_name, {"type": action, "message": message}
        )
            
        if action == "report_status_update":
            await self.channel_layer.group_send(
            self.group_name, {"type": action, "message": message}
        )
        

        await self.channel_layer.group_send(
            self.group_name, {"type": "chat_message", "message": message}
        )

    async def processing_status(self, event):
        await self.send(text_data=event['text'])

    async def file_upload_update(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"type": "file_upload_update", "message": message}))

    async def report_status_update(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"type": "report_status_update", "message": message}))

    

    

    async def chat_message(self, event):
        message = event["message"]
        type_ = event["type"]
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message, "type": type_}))