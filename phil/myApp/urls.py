from django.urls import path
from . import views
from .views import login_view
from .views import verify_payment



urlpatterns = [
    path('', verify_payment, name='verify_payment'),
    path('login/', login_view, name='login'),  # URL for the login endpoint
    # With reference in URL
    path('verify-payment/<str:reference>/', verify_payment, name='verify_payment_with_ref'),
    # Without reference (will look for reference in request)
    path('verify-payment/', verify_payment, name='verify_payment_without_ref'),
    
]
