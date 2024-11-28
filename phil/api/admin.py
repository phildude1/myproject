from django.contrib import admin
from .models import Product  # Add this import line

# Register your models here.
from django.urls import path
from django.http import HttpResponse
from django.contrib import admin


admin.site.register(Product)



class MyAdminSite(admin.AdminSite):
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('transaction/', self.transaction_view),  # Your custom view
        ]
        return custom_urls + urls

    def transaction_view(self, request):
        return HttpResponse("This is a custom transaction view in admin.")

admin_site = MyAdminSite(name='custom_admin')
