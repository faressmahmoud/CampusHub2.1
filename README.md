# CampusHub

A full-stack web-based planner for university students. Organize your daily academic tasks, deadlines, quick notes, and important links in one place.

## Features

- ✅ **Authentication System**: JWT-based login and registration
- ✅ **Task Management**: Create, edit, and track tasks with due dates, priorities, and status
- ✅ **Notes & Links**: Keep quick notes and save important links
- ✅ **Dashboard**: Overview of your academic progress and upcoming deadlines
- ✅ **RESTful API**: Full backend with MongoDB database
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ✅ **Secure**: Password hashing, JWT tokens, protected routes

## 🔗 GitHub Repository
You can access the full project here:  
https://github.com/faressmahmoud/CampusHub2.1

## Tech Stack

### Frontend
- React (no TypeScript)
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- CORS enabled

## Project Structure

```
CampusHub/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   ├── noteController.js
│   │   └── linkController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── logger.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Note.js
│   │   └── Link.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── noteRoutes.js
│   │   └── linkRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seed.js
│   ├── server.js
│   └── package.json
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   ├── notes.js
│   │   └── links.js
│   ├── components/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   └── ...
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CampusHub
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up environment variables:

Create a `.env` file in the `backend/` directory:
```env
MONGODB_URI=mongodb://localhost:27017/campushub
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Create a `.env` file in the root directory for frontend:
```env
VITE_API_URL=http://localhost:5001/api
```

5. Seed the database (optional):
```bash
cd backend
npm run seed
```

This creates a demo user:
- **Email**: `demo@student.com`
- **Password**: `demo123`

6. Start the backend server:
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

7. Start the frontend (in a new terminal):
```bash
npm start
```

The frontend will open at `http://localhost:5173` and the backend API at `http://localhost:5001`

## API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "university": "Cairo University"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "university": "Cairo University",
      "role": "student"
    },
    "token": "jwt-token-here"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Tasks Endpoints

All task endpoints require authentication (Bearer token in header).

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete Math Assignment",
  "course": "MATH101",
  "dueDate": "2024-12-31",
  "priority": "high",
  "status": "pending"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

### Notes Endpoints

All note endpoints require authentication.

#### Get All Notes
```http
GET /api/notes
Authorization: Bearer <token>
```

#### Create Note
```http
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Important Dates",
  "content": "Midterm exams: Week 8"
}
```

#### Update Note
```http
PUT /api/notes/:id
Authorization: Bearer <token>
```

#### Delete Note
```http
DELETE /api/notes/:id
Authorization: Bearer <token>
```

### Links Endpoints

All link endpoints require authentication.

#### Get All Links
```http
GET /api/links
Authorization: Bearer <token>
```

#### Create Link
```http
POST /api/links
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "University Portal",
  "url": "https://www.example.com"
}
```

#### Update Link
```http
PUT /api/links/:id
Authorization: Bearer <token>
```

#### Delete Link
```http
DELETE /api/links/:id
Authorization: Bearer <token>
```

## Usage

### Registering a New Account

1. Click "Register here" on the login page
2. Fill in your details:
   - Full Name (required)
   - Email (required)
   - Password (minimum 6 characters)
   - University (select from list or enter custom)
3. Click "Register" to create your account

### Features Overview

#### Dashboard
- View task statistics (total, completed, pending, high priority)
- See upcoming tasks (next 7 days)
- Quick access to tasks and notes

#### Tasks
- Add tasks with title, course, due date, priority, and status
- Filter by status and priority
- Sort by due date, priority, or title
- Edit and delete tasks
- Mark tasks as completed

#### Notes & Links
- Create and manage notes
- Save important links with URL validation
- Edit and delete notes/links

## Deployment

### Backend (Render)

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables:
   - `MONGODB_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET` (strong random string)
   - `FRONTEND_URL` (your frontend URL)
   - `NODE_ENV=production`

### Frontend (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist/` folder
3. Set environment variable: `VITE_API_URL` to your backend URL

## Development

### Available Scripts

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Seed database with demo data

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes with middleware
- Input validation and sanitization
- CORS configuration
- Error handling middleware

## Supported Universities

- The American University in Cairo (AUC)
- Cairo University
- Ain Shams University
- Helwan University
- German University in Cairo (GUC)
- Nile University
- Other (with custom input)

## License

This project is created for educational purposes.
