from django.urls import path

from .views import HealthCheckView, SubscriptionCreateView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('subscriptions/', SubscriptionCreateView.as_view(),
         name='subscription-create'),
]
