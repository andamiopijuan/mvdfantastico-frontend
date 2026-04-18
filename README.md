# Montevideo Fantástico — Platform

International film festival platform for horror, fantasy, and science fiction independent cinema.

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | Django 5.x + Django REST Framework |
| Database | MySQL 8.0 |
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| i18n | next-intl (ES / EN / PT) |

## Project Structure

```
MVD FANTASTICO/
├── backend/          # Django REST API
├── frontend/         # Next.js application
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites
- Python 3.12+
- Node.js 20+
- MySQL 8.0+
- Docker & Docker Compose (optional)

### With Docker
```bash
docker-compose up --build
```

### Manual Setup

#### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
cp .env.example .env            # fill in your values
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local   # fill in your values
npm run dev
```

## URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Django API | http://localhost:8000/api/ |
| Django Admin | http://localhost:8000/admin/ |

## Environment Variables

See `backend/.env.example` and `frontend/.env.local.example`.

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/editions/` | All editions |
| `GET /api/editions/current/` | Current active edition |
| `GET /api/editions/{year}/` | Edition by year |
| `GET /api/editions/{year}/films/` | Films for an edition |
| `GET /api/editions/{year}/events/` | Schedule for an edition |
| `GET /api/editions/{year}/awards/` | Awards for an edition |
| `POST /api/contact/` | Submit contact form |

## Data Model

```
Edition 1──* Film
Edition 1──* Award
Edition 1──* Event
Award *──1 Film (optional)
Event *──1 Film (optional)
Edition 1──* Asset
```
