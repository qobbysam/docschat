
from rest_framework import serializers

from .models import ChatSession, ChatTransaction

class ChatSessionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ChatSession
        fields = [
            'id', 
            'used', 
            'locked', 
            'created', 
            'title', 
            'selected', 
            'mode', 
            'memory']


class ChatTransactionSerializer(serializers.ModelSerializer):

    session = ChatSessionSerializer()
    class Meta:
        model = ChatTransaction
        fields = [
            'id',
            'prompt', 
            'response', 
            'created', 
            'mode',
            'selected',
            'content',
            'sources',
            'thought',
            'extra',
            'session',]


class SelectedSerializer(serializers.Serializer):
    id = serializers.CharField()
    title = serializers.CharField()

class SelectedListSerializer(serializers.ListSerializer):
    child = SelectedSerializer()


class UnknownKeyValueField(serializers.Field):
    """
    Custom serializer field for handling a list of unknown key-value pairs.
    """
    def to_representation(self, value):
        """
        Convert the list of dictionaries to a single dictionary.
        """
        result = {}
        for item in value:
            key = item['key']
            if 'value' in item:
                result[key] = item['value']
            elif 'values' in item:
                result[key] = item['values']
            elif 'object' in item:
                result[key] = item['object']
        return result

    def to_internal_value(self, data):
        """
        Convert the dictionary to a list of dictionaries.
        """
        result = []
        for key, value in data.items():
            if isinstance(value, list):
                result.append({'key': key, 'values': value})
            elif isinstance(value, dict):
                result.append({'key': key, 'object': value})
            else:
                result.append({'key': key, 'value': value})
        return result

    
class ChatPromptSerializer(serializers.Serializer):

    prompt = serializers.CharField()
    session = serializers.CharField()
    selected = SelectedListSerializer(required=False)
    mode = serializers.CharField(required=False)
    extra = UnknownKeyValueField(required=False)
    

    def validate(self, data):
        session_id = data.get('session')
        
        try:
            session = ChatSession.objects.get(id=session_id)
        except ChatSession.DoesNotExist:
            raise serializers.ValidationError('Invalid session')
        
        if session.locked:
            raise serializers.ValidationError('Session is locked')
        
        return data
