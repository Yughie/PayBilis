import logging

from django.utils import timezone
from django.db import connections
from django.db import IntegrityError
from django.db import DatabaseError
from django.db.utils import OperationalError, ProgrammingError
from rest_framework import status, views
from rest_framework.response import Response

from .models import Subscription
from .serializers import SubscriptionSerializer


logger = logging.getLogger(__name__)


class SubscriptionCreateView(views.APIView):
    def post(self, request):
        serializer = SubscriptionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            subscription = serializer.save()
            return Response(SubscriptionSerializer(subscription).data, status=status.HTTP_201_CREATED)
        except (OperationalError, ProgrammingError, DatabaseError):
            logger.exception(
                'Database is unavailable while creating subscription.')
            return Response(
                {
                    'detail': 'Database is unavailable. Verify DATABASE_URL and migrations on the backend service.',
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
            logger.exception(
                'Unexpected server error while creating subscription.')
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
        overall_status = 'ok'
        db_status = 'ok'
        status_code = status.HTTP_200_OK

        try:
            with connections['default'].cursor() as cursor:
                cursor.execute('SELECT 1')
            Subscription.objects.exists()
        except (OperationalError, ProgrammingError, DatabaseError):
            logger.exception('Health check failed: database unavailable.')
            overall_status = 'degraded'
            db_status = 'error'
            status_code = status.HTTP_503_SERVICE_UNAVAILABLE

        return Response(
            {
                'status': overall_status,
                'service': 'paybilis-backend',
                'database': db_status,
                'timestamp': timezone.now().isoformat(),
            },
            status=status_code,
        )


class AIChatView(views.APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        try:
            from .services.chatbot import build_chat_chain, clean_answer_text, load_faq_context
        except Exception:
            logger.exception('AI dependencies failed to load.')
            return Response(
                {
                    'detail': 'AI service dependencies are unavailable on the server.',
                    'code': 'ai_dependencies_unavailable',
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        question = (request.data.get('message') or '').strip()

        if not question:
            return Response(
                {
                    'detail': 'The message field is required.',
                    'code': 'validation_error',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            faq_context = load_faq_context()
            if not faq_context:
                return Response(
                    {
                        'detail': 'FAQ knowledge base is empty or not found. Configure FAQ_KB_PATH or add content to backend/rag/faq_knowledge_base.txt.',
                        'code': 'faq_not_configured',
                    },
                    status=status.HTTP_503_SERVICE_UNAVAILABLE,
                )

            chain = build_chat_chain()
            answer = chain.invoke(
                {
                    'faq_context': faq_context,
                    'question': question,
                }
            )
            answer = clean_answer_text(answer)

            return Response(
                {
                    'answer': answer,
                },
                status=status.HTTP_200_OK,
            )
        except ValueError as exc:
            return Response(
                {
                    'detail': str(exc),
                    'code': 'ai_not_configured',
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        except Exception:
            logger.exception('Unexpected AI chat error.')
            return Response(
                {
                    'detail': 'Unable to process AI chat request right now.',
                    'code': 'ai_unavailable',
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
