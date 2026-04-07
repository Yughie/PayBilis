from django.contrib import admin

from .models import Biller, Subscription


class BillerInline(admin.TabularInline):
    model = Biller
    extra = 0


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'contact_number', 'frequency', 'created_at')
    search_fields = ('full_name', 'contact_number', 'house_address')
    inlines = [BillerInline]
