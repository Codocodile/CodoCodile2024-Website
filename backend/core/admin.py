from django.contrib import admin

from core import models

class VisitModelAdmin(admin.ModelAdmin):
    readonly_fields = ['date_created'] 
    list_filter = ["url"] 
    
    

admin.site.register(models.Challenger)
admin.site.register(models.Group)
admin.site.register(models.Membership)
admin.site.register(models.Visit, VisitModelAdmin)

