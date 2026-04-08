from django.utils import timezone
from django.db import connections
from django.db.utils import OperationalError, ProgrammingError
from rest_framework import status, views
from rest_framework.response import Response

from .models import Subscription
from .serializers import SubscriptionSerializer


class SubscriptionCreateView(views.APIView):
    def post(self, request):
        serializer = SubscriptionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subscription = serializer.save()
        return Response(SubscriptionSerializer(subscription).data, status=status.HTTP_201_CREATED)


class HealthCheckView(views.APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        db_status = 'ok'
        status_code = status.HTTP_200_OK

        try:
            with connections['default'].cursor() as cursor:
                cursor.execute('SELECT 1')
            Subscription.objects.exists()
        except (OperationalError, ProgrammingError):
            db_status = 'error'
            status_code = status.HTTP_503_SERVICE_UNAVAILABLE

        return Response(
            {
                'status': 'ok',
                'service': 'paybilis-backend',
                'database': db_status,
                'timestamp': timezone.now().isoformat(),
            },
            status=status_code,
        )
