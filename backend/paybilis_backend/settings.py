from pathlib import Path
import os
from urllib.parse import urlparse, unquote

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent


def parse_origin_list(env_key, default):
    raw_value = os.getenv(env_key)
    if not raw_value:
        return default
    return [origin.strip() for origin in raw_value.split(',') if origin.strip()]


def merge_origin_lists(*origin_lists):
    merged = []
    for origins in origin_lists:
        for origin in origins:
            value = origin.strip()
            if value and value not in merged:
                merged.append(value)
    return merged


def parse_allowed_hosts(default):
    raw_value = os.getenv('DJANGO_ALLOWED_HOSTS')
    if not raw_value:
        return default

    hosts = []
    for value in raw_value.split(','):
        candidate = value.strip()
        if not candidate:
            continue

        # Accept values with or without scheme and keep only hostname for Django.
        if '://' in candidate:
            parsed = urlparse(candidate)
            candidate = parsed.hostname or ''

        candidate = candidate.split('/')[0].strip()
        if candidate:
            hosts.append(candidate)

    return hosts or default


SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-paybilis-dev-key')
DEBUG = os.getenv('DJANGO_DEBUG', 'true').lower() == 'true'

ALLOWED_HOSTS = parse_allowed_hosts([
    'localhost',
    '127.0.0.1',
    'paybilis-backend.onrender.com',
    '.onrender.com',
])

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'subscriptions',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'paybilis_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'paybilis_backend.wsgi.application'

database_url = os.getenv('DATABASE_URL')

if database_url:
    parsed_database_url = urlparse(database_url)
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': parsed_database_url.path.lstrip('/'),
            'USER': unquote(parsed_database_url.username or ''),
            'PASSWORD': unquote(parsed_database_url.password or ''),
            'HOST': parsed_database_url.hostname or '',
            'PORT': parsed_database_url.port or '',
            'OPTIONS': {
                'sslmode': 'require' if parsed_database_url.scheme in {'postgres', 'postgresql'} else 'prefer',
            },
        }
    }
else:
    supabase_db_host = os.getenv('SUPABASE_DB_HOST')

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('SUPABASE_DB_NAME', 'postgres'),
            'USER': os.getenv('SUPABASE_DB_USER', 'postgres'),
            'PASSWORD': os.getenv('SUPABASE_DB_PASSWORD', ''),
            'HOST': supabase_db_host or 'localhost',
            'PORT': os.getenv('SUPABASE_DB_PORT', '5432'),
            'OPTIONS': {
                'sslmode': os.getenv('SUPABASE_DB_SSLMODE', 'prefer'),
            },
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS = False
DEFAULT_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'https://paybilis.onrender.com',
    'https://paybilis-frontend.onrender.com',
]
CORS_ALLOWED_ORIGINS = merge_origin_lists(
    DEFAULT_ALLOWED_ORIGINS,
    parse_origin_list('CORS_ALLOWED_ORIGINS', []),
)
# Keep Render preview/alternate static domains working without per-deploy env edits.
CORS_ALLOWED_ORIGIN_REGEXES = [r'^https://.*\.onrender\.com$']
CORS_ALLOW_METHODS = ['DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT']

CSRF_TRUSTED_ORIGINS = merge_origin_lists(
    DEFAULT_ALLOWED_ORIGINS,
    parse_origin_list('CSRF_TRUSTED_ORIGINS', []),
)

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer'],
}
