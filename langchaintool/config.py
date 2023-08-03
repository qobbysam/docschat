
import os 
from langchain.prompts import ChatPromptTemplate

class DefaultConfig:
    engine=os.environ.get('EMBEDDING_ENGINE')
    model_name= os.environ.get('CHAT_MODEL')
    temperature = 0.0
    n=1
    max_tokens=50
    stop=None
    api_key = os.environ.get('OPENAI_API_KEY')