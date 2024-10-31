from django.contrib import admin

from core import models

import secrets

def populate_judge_fields(modeladmin, request, queryset):
    for group in queryset:
        group.judge_username = f"team_{group.id}"
        group.judge_password = secrets.token_urlsafe(12)
        group.save()

class GroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'judge_username', 'judge_password']
    actions = [populate_judge_fields]

class VisitModelAdmin(admin.ModelAdmin):
    readonly_fields = ['date_created'] 
    list_filter = ["url"] 
    
    

admin.site.register(models.Challenger)
admin.site.register(models.Group, GroupAdmin)
admin.site.register(models.Membership)
admin.site.register(models.Visit, VisitModelAdmin)

