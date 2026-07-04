# 🎯 Interview Prep Platform

A comprehensive web-based platform for practicing DSA, system design, and mock interviews with AI-powered hints and real-time feedback.

## 📌 Features

### 1. **DSA Problem Practice**
- Curated problems from Striver's A2Z DSA Sheet
- Problem difficulty levels (Easy, Medium, Hard)
- Code editor with syntax highlighting
- Test case validation
- AI-powered hints system

### 2. **Mock Interview System**
- Live coding environment
- Real-time code execution
- Video recording & playback
- Interviewer feedback
- Performance analytics

### 3. **System Design Practice**
- Interactive whiteboard
- Curated design problems
- Time-boxed sessions
- Evaluator feedback

### 4. **Progress Tracking**
- Personal dashboard with statistics
- Problem-solving streaks
- Difficulty progression
- Time tracking
- Performance graphs

### 5. **AI Hint Generator**
- Context-aware hints using OpenAI
- Progressive hint levels (approach → solution structure → code)
- Plagiarism detection

### 6. **Peer Learning**
- Discuss solutions in community
- View others' approaches
- Code reviews

---

## 🛠️ Tech Stack

### **Frontend**
- React 18 + TypeScript
- TailwindCSS for styling
- Redux for state management
- Monaco Editor for code editing
- Socket.io for real-time features
- Video.js for video recording

### **Backend**
- Node.js + Express.js
- PostgreSQL for database
- Redis for caching & real-time features
- JWT authentication
- OpenAI API for AI hints
- Docker for containerization

### **DevOps & Deployment**
- Docker & Docker Compose
- GitHub Actions CI/CD
- Deployed on AWS/Vercel/Railway

---

## 📂 Project Structure

```
Interview_prep/
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── store/           # Redux slices
│   │   ├── services/        # API calls
│   │   ├── styles/          # TailwindCSS styles
│   │   └── utils/           # Helper functions
│   ├── public/              # Static files
│   └── package.json
│
├── backend/                  # Node.js + Express
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth, validation
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helpers
│   │   └── config/          # Configuration
│   ├── migrations/          # Database migrations
│   └── package.json
│
├── docker-compose.yml        # Docker setup
├── .github/workflows/        # CI/CD pipelines
├── docs/                     # Documentation
└── .env.example              # Environment template
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Docker (optional)

### Installation

#### 1. **Clone the repository**
```bash
git clone https://github.com/jaanuC600/Interview_prep.git
cd Interview_prep
```

#### 2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

#### 3. **Frontend Setup**
```bash
cd ../frontend
npm install
cp .env.example .env
npm start
```

#### 4. **Using Docker**
```bash
docker-compose up -d
```

---

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get problem details
- `POST /api/problems/:id/submit` - Submit solution
- `GET /api/problems/:id/hints` - Get AI hints

### Mock Interviews
- `POST /api/interviews` - Create mock interview
- `GET /api/interviews/:id` - Get interview details
- `POST /api/interviews/:id/submit` - Submit interview
- `GET /api/interviews/:id/feedback` - Get AI feedback

### User Progress
- `GET /api/user/dashboard` - Get user statistics
- `GET /api/user/submissions` - Get submission history
- `GET /api/user/streaks` - Get streak data

---

## 🌟 Give this repo a Star if you find it helpful!
