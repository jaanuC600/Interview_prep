# Setup Guide

## Local Development

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Redis

### Backend Setup
```bash
cd backend
npm install
cp ../.env.example .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp ../.env.example .env
npm start
```

## Docker Setup
```bash
docker-compose up -d
```

## Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/api/health
