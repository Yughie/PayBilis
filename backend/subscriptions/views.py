from django.utils import timezone
from django.db import connections
from django.db import IntegrityError
from django.db.utils import OperationalError, ProgrammingError
from rest_framework import status, views
from rest_framework.response import Response

from .models import Subscription
from .serializers import SubscriptionSerializer


class SubscriptionCreateView(views.APIView):
    def post(self, request):
        serializer = SubscriptionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            subscription = serializer.save()
            return Response(SubscriptionSerializer(subscription).data, status=status.HTTP_201_CREATED)
        except (OperationalError, ProgrammingError):
            return Response(
                {
                    'detail': 'Database is not ready. Please try again in a few minutes.',
                    'code': 'database_unavailable',
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        except IntegrityError:
            return Response(
                {
                    'detail': 'Unable to save subscription due to invalid data.',
                    'code': 'integrity_error',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception:
            return Response(
                {
                    'detail': 'Unexpected server error while creating subscription.',
                    'code': 'unexpected_error',
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


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
