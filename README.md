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
