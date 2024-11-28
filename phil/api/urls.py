from django.urls import path
from django.contrib import admin  # Change the import

from .views import (
    ProductListCreateView,
    initialize_payment,
    verify_payment
)

from . import views
from phil.admin import admin_site



urlpatterns = [
    path('admin/', admin_site.urls),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('initialize-payment/', views.initialize_payment, name='initialize_payment'),
    path('verify-payments/<str:reference>/', views.verify_payment, name='verify_payment'),  # Note the trailing slash 
    path('transaction/', views.transaction_view, name='transaction'),

]
