from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from api.serializers import ProductSerializer
from rest_framework.views import APIView
from django.http import HttpResponse
# phil/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
from django.conf import settings
from rest_framework.decorators import api_view
import logging

from django.views.decorators.http import require_http_methods


from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required


from django.views.decorators.csrf import csrf_protect

from django.middleware.csrf import get_token
from django.http import JsonResponse

import logging
import traceback
import requests
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Initialize logger
logger = logging.getLogger(__name__)















@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    # Comprehensive logging
    print("Request method:", request.method)
    print("Content type:", request.content_type)
    print("Raw body:", request.body)

    try:
        # Try parsing the body in multiple ways
        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            # Fallback parsing
            data = json.loads(request.body.decode('utf-8'))
        
        print("Parsed data:", data)

        # Basic validation
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({
                'error': 'Username and password are required'
            }, status=400)

        return JsonResponse({'status': 'success'})

    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        return JsonResponse({
            'error': 'Invalid JSON',
            'details': str(e)
        }, status=400)
    except Exception as e:
        print(f"Unexpected error: {e}")
        return JsonResponse({
            'error': 'Unexpected error',
            'details': str(e)
        }, status=400)


def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logout successful"})




def home_view(request):
    return HttpResponse("Welcome to the Web App Dashboard!")



def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})



import logging
import traceback
import requests
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Add logging
logger = logging.getLogger(__name__)

@api_view(['GET', 'POST'])
def verify_payment(request, reference=None):
    try:
        # Extensive logging
        logger.info(f"Verify Payment Request - Method: {request.method}")
        logger.info(f"URL Parameters: {request.query_params}")
        logger.info(f"Request Data: {request.data}")
        logger.info(f"URL Reference: {reference}")

        # Reference extraction with detailed logging
        if reference is None:
            reference = (
                request.query_params.get('reference') or 
                request.data.get('reference')
            )
        
        logger.info(f"Extracted Reference: {reference}")

        # Validate reference
        if not reference:
            logger.warning("No reference provided")
            return Response({
                'status': 'error', 
                'message': 'Payment reference is required'
            }, status=400)

        # Ensure Paystack secret key is set
        if not settings.PAYSTACK_SECRET_KEY:
            logger.error("Paystack Secret Key is not configured")
            return Response({
                'status': 'error', 
                'message': 'Payment verification is not configured'
            }, status=500)

        url = f'https://api.paystack.co/transaction/verify/{reference}'
        headers = {
            'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
        }
        
        try:
            response = requests.get(url, headers=headers)
            logger.info(f"Paystack Response Status: {response.status_code}")
            logger.info(f"Paystack Response Body: {response.text}")

            if response.status_code == 200:
                data = response.json()
                logger.info(f"Parsed Paystack Data: {data}")
                
                if data['data']['status'] == 'success':
                    return Response({
                        'status': 'success', 
                        'data': data['data']
                    })
            
            logger.warning(f"Payment verification failed: {response.text}")
            return Response({
                'status': 'error', 
                'message': 'Payment verification failed.'
            }, status=400)
        
        except requests.RequestException as e:
            logger.error(f"Request Exception: {e}")
            logger.error(traceback.format_exc())
            return Response({
                'status': 'error', 
                'message': f'Request failed: {str(e)}'
            }, status=500)
    
    except Exception as e:
        # Catch-all for any unexpected errors
        logger.error(f"Unexpected Error: {e}")
        logger.error(traceback.format_exc())
        return Response({
            'status': 'error', 
            'message': f'Unexpected server error: {str(e)}'
        }, status=500)


@login_required
def protected_view(request):
    return JsonResponse({
        "message": "This is a secure API call!",
        "authenticated": True
    })




@csrf_protect
def secure_endpoint(request):
    if request.method == "POST":
        return JsonResponse({"message": "Data received securely!"})
    return JsonResponse({"error": "Invalid method"}, status=405)







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