# PayBilis

PayBilis is a full-stack subscription-based bill payment web app.

## Project Structure

- `frontend/` - React + Vite + Tailwind CSS app
- `backend/` - Django REST API connected to Supabase/PostgreSQL

## Environment Setup

Copy the example environment files and fill in your real values:

- `backend/.env.example` to `backend/.env`
- `frontend/.env.example` to `frontend/.env`

## Backend

Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

For production deployments on Render, make sure the backend start command uses Gunicorn:

```bash
gunicorn paybilis_backend.wsgi:application --bind 0.0.0.0:$PORT
```

Run migrations:

```bash
python manage.py migrate
```

Start the server:

```bash
python manage.py runserver
```

## Frontend

Install dependencies:

```bash
cd frontend
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## API

The frontend submits subscription data to:

`POST /api/subscriptions/`

Set `VITE_API_BASE_URL` in `frontend/.env` to point to your Django backend.

## Deployment

The frontend is a Vite app, so the production build output is `frontend/dist`.

If you use Render Blueprint deploys, import the root `render.yaml` file instead of entering the build and publish fields manually.

If you deploy the frontend on Render, use these settings:

- Root directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`

Render installs the frontend dependencies automatically for static sites, so `npm install` does not belong in the publish directory or blueprint fields.

The error `Publish directory npm run build does not exist!` means `npm run build` was entered in the publish directory field instead of the build command field.

For the backend, make sure the Render service environment variable `DJANGO_ALLOWED_HOSTS` includes your deployed backend host, for example `paybilis-backend.onrender.com,.onrender.com`. If this variable is set to only `localhost,127.0.0.1`, Django will return `400 Bad Request` for every request on Render.

For production database access, the backend now prefers `DATABASE_URL` when Render provides it. If you are not using a Render-managed database, keep the `SUPABASE_DB_*` variables set on the backend service.
