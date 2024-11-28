from django.contrib import admin


# register the models here

class CustomAdminSite(admin.AdminSite):
    site_header = "My Custom Admin"
    site_title = "Admin Portal"
    index_title = "Welcome to My Admin"

admin_site = CustomAdminSite(name='custom_admin')