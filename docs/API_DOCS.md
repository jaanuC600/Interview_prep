# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh

### Problems
- GET /problems
- GET /problems/:id
- POST /problems/:id/submit
- GET /problems/:id/hints

### Interviews
- POST /interviews
- GET /interviews/:id
- POST /interviews/:id/submit
- GET /interviews/:id/feedback

### User
- GET /user/dashboard
- GET /user/submissions
- GET /user/profile
- PUT /user/profile
