from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

# phil/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
from django.conf import settings
from django.http import HttpResponse

def home_view(request):
    return HttpResponse("Welcome to the Web App Dashboard!")





@csrf_exempt
def initialize_payment(request):
    if request.method == 'POST':
        try:
            # Your initialization logic here
            pass
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def verify_payment(request, reference):
    try:
        headers = {
            'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
            'Content-Type': 'application/json',
        }
        
        response = requests.get(
            f'https://api.paystack.co/transaction/verify/{reference}',
            headers=headers
        )
        
        return JsonResponse(response.json())
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)






class ProductListCreateView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def transaction_view(request):
    return JsonResponse({'status': 'success', 'message': 'Transaction endpoint working!'})