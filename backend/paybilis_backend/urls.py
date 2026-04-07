from django.contrib import admin
from django.urls import include, path

from subscriptions.views import HealthCheckView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health-check/', HealthCheckView.as_view(), name='health-check'),
    path('api/', include('subscriptions.urls')),
]
