from django.utils import timezone
from rest_framework import status, views
from rest_framework.response import Response

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
        return Response(
            {
                'status': 'ok',
                'service': 'paybilis-backend',
                'timestamp': timezone.now().isoformat(),
            },
            status=status.HTTP_200_OK,
        )
