# LearnSphere Backend

Minimal Express + MongoDB API for LearnSphere MVP.

## Prerequisites
- Node.js 18+
- Docker (for MongoDB) or local MongoDB server

## Setup
1. Copy environment file and edit values:
```
cp .env.example .env
```

2. Start MongoDB using Docker Compose:
```
docker compose up -d
```

3. Install dependencies:
```
cd backend
npm install
```

4. Seed an admin user (requires ADMIN_* in .env):
```
npm run seed:admin
```

5. Start the API:
```
npm run dev
```

- Health check: GET http://localhost:4000/health

## Key Endpoints
- Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- Users (admin): GET/POST/PUT/DELETE /api/users
- Courses: GET/POST/PUT/DELETE /api/courses, GET /api/courses/:id
- Lessons: GET/POST/PUT/DELETE /api/lessons
- Quizzes: GET/POST/PUT/DELETE /api/quizzes, POST /api/quizzes/:id/attempt
- Enrollments: POST /api/enrollments, GET /api/enrollments/me
- Progress: POST /api/progress/complete, GET /api/progress/:courseId

## Notes
- JWT secret and DB URI are loaded from `.env`.
- Role-based routes enforce ADMIN/INSTRUCTOR access where required.
