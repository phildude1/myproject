from django.contrib import admin

# Register your models here.
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'amount', 'status', 'created_at')  # Customize fields as needed
