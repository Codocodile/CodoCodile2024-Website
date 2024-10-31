from django.http import HttpResponse
from django.contrib import admin

from core import models

import secrets
import csv

def populate_judge_fields(modeladmin, request, queryset):
    for group in queryset:
        group.judge_username = f"team_{group.id}"
        group.judge_password = secrets.token_urlsafe(12)
        group.save()

def export_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=group_data.csv'
    
    writer = csv.writer(response)
    writer.writerow(['name', 'Judge Username', 'Judge Password', 'level'])
    
    for group in queryset:
        writer.writerow([group.name, group.judge_username, group.judge_password, group.level])
    
    return response

def update_level(modeladmin, request, queryset):
    for group in queryset:
        group.update_level()

class GroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'judge_username', 'level']
    actions = [populate_judge_fields, export_to_csv, update_level]

class VisitModelAdmin(admin.ModelAdmin):
    readonly_fields = ['date_created'] 
    list_filter = ["url"] 
    
    

admin.site.register(models.Challenger)
admin.site.register(models.Group, GroupAdmin)
admin.site.register(models.Membership)
admin.site.register(models.Visit, VisitModelAdmin)



