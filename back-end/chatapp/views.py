from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MessageSerializer
from .models import  Message
from django.conf import settings
import openai

openai.api_key = settings.OPENAI_API_KEY

@api_view(['POST'])
def get_response(request):
    if request.method == 'POST':
        try:
            data = request.data
            message = data.get('message')
            if not message:
                return Response({'error': 'Message is required'}, status=400)

            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": message}],
                max_tokens=100
            )

            return Response({'response': response.choices[0].message.content})
        except Exception as e:
            print("Error:", e)
            return Response({'error': 'Internal Server Error'}, status=500)
    else:
        return Response({'error': 'Method not allowed'}, status=405)
