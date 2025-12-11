# CampusHub Backend API - Milestone 3 Documentation

## 📋 Project Overview

CampusHub Backend is a RESTful API built with Node.js, Express, and MongoDB. It provides authentication and CRUD operations for managing university services, tasks, notes, links, and user accounts. The API follows REST principles, implements JWT-based authentication, and uses Mongoose for database operations.

## 🏗️ Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic (register, login, getMe)
│   ├── taskController.js     # Task CRUD operations
│   ├── noteController.js     # Note CRUD operations
│   ├── linkController.js     # Link CRUD operations
│   └── serviceController.js  # Service CRUD operations
├── middleware/
│   ├── authMiddleware.js     # JWT authentication & authorization
│   ├── errorHandler.js        # Global error handling middleware
│   └── logger.js             # Request logging middleware
├── models/
│   ├── User.js               # User schema with password hashing
│   ├── Task.js               # Task schema
│   ├── Note.js               # Note schema
│   ├── Link.js               # Link schema
│   └── Service.js            # Service schema
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── taskRoutes.js         # Task routes
│   ├── noteRoutes.js         # Note routes
│   ├── linkRoutes.js         # Link routes
│   └── serviceRoutes.js      # Service routes
├── utils/
│   ├── generateToken.js      # JWT token generation
│   └── seed.js               # Database seeding utility
├── server.js                 # Main server file
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file in the backend directory:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   PORT=5000
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

4. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

## 📡 API Endpoints

### Base URL
- **Local:** `http://localhost:5000/api`
- **Production:** `https://campushub2-1.onrender.com/api`

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "university": "Example University"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com",
        "university": "Example University",
        "role": "student"
      },
      "token": "jwt_token_here"
    }
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com",
        "university": "Example University",
        "role": "student"
      },
      "token": "jwt_token_here"
    }
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Access:** Private (requires JWT token)
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com",
        "university": "Example University",
        "role": "student"
      }
    }
  }
  ```

### Task Endpoints

All task endpoints require authentication.

#### Get All Tasks
- **GET** `/api/tasks`
- **Access:** Private
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "task_id",
        "title": "Complete Assignment",
        "course": "CS101",
        "dueDate": "2024-12-31T00:00:00.000Z",
        "priority": "high",
        "status": "pending",
        "user": "user_id",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### Get Single Task
- **GET** `/api/tasks/:id`
- **Access:** Private

#### Create Task
- **POST** `/api/tasks`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "title": "Complete Assignment",
    "course": "CS101",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "priority": "high",
    "status": "pending"
  }
  ```

#### Update Task
- **PUT** `/api/tasks/:id`
- **Access:** Private

#### Delete Task
- **DELETE** `/api/tasks/:id`
- **Access:** Private

### Note Endpoints

All note endpoints require authentication.

#### Get All Notes
- **GET** `/api/notes`
- **Access:** Private

#### Get Single Note
- **GET** `/api/notes/:id`
- **Access:** Private

#### Create Note
- **POST** `/api/notes`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "title": "Lecture Notes",
    "content": "Important points from today's lecture..."
  }
  ```

#### Update Note
- **PUT** `/api/notes/:id`
- **Access:** Private

#### Delete Note
- **DELETE** `/api/notes/:id`
- **Access:** Private

### Link Endpoints

All link endpoints require authentication.

#### Get All Links
- **GET** `/api/links`
- **Access:** Private

#### Get Single Link
- **GET** `/api/links/:id`
- **Access:** Private

#### Create Link
- **POST** `/api/links`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "title": "Course Website",
    "url": "https://example.com",
    "description": "Main course website"
  }
  ```

#### Update Link
- **PUT** `/api/links/:id`
- **Access:** Private

#### Delete Link
- **DELETE** `/api/links/:id`
- **Access:** Private

### Service Endpoints

All service endpoints require authentication.

#### Get All Services
- **GET** `/api/services`
- **Access:** Private

#### Get Single Service
- **GET** `/api/services/:id`
- **Access:** Private

#### Create Service
- **POST** `/api/services`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "name": "Library Access",
    "description": "Request library access card",
    "category": "facilities",
    "priority": "medium",
    "status": "pending",
    "contactEmail": "library@university.edu"
  }
  ```

#### Update Service
- **PUT** `/api/services/:id`
- **Access:** Private

#### Delete Service
- **DELETE** `/api/services/:id`
- **Access:** Private

### Health Check

#### Server Status
- **GET** `/api/health`
- **Access:** Public
- **Response:**
  ```json
  {
    "status": "ok",
    "time": "2024-01-01T00:00:00.000Z"
  }
  ```

## 🗄️ Database Models

### User Model
- **Fields:**
  - `fullName` (String, required)
  - `email` (String, required, unique, indexed)
  - `password` (String, required, hashed with bcrypt)
  - `university` (String, required)
  - `role` (String, enum: ['student', 'admin'], default: 'student')
  - `createdAt`, `updatedAt` (timestamps)

### Task Model
- **Fields:**
  - `user` (ObjectId, ref: User, required, indexed)
  - `title` (String, required)
  - `course` (String)
  - `dueDate` (Date, required)
  - `priority` (String, enum: ['low', 'medium', 'high'], default: 'medium')
  - `status` (String, enum: ['pending', 'in-progress', 'completed'], default: 'pending')
  - `createdAt`, `updatedAt` (timestamps)

### Note Model
- **Fields:**
  - `user` (ObjectId, ref: User, required, indexed)
  - `title` (String, required)
  - `content` (String)
  - `createdAt`, `updatedAt` (timestamps)

### Link Model
- **Fields:**
  - `user` (ObjectId, ref: User, required, indexed)
  - `title` (String, required)
  - `url` (String, required)
  - `description` (String)
  - `createdAt`, `updatedAt` (timestamps)

### Service Model
- **Fields:**
  - `user` (ObjectId, ref: User, required, indexed)
  - `name` (String, required)
  - `description` (String)
  - `category` (String, enum: ['academic', 'administrative', 'facilities', 'support', 'other'], default: 'other')
  - `status` (String, enum: ['pending', 'in-progress', 'resolved', 'cancelled'], default: 'pending')
  - `priority` (String, enum: ['low', 'medium', 'high'], default: 'medium')
  - `contactEmail` (String, validated)
  - `notes` (String)
  - `createdAt`, `updatedAt` (timestamps)

## 🔐 Authentication & Security

### JWT Authentication
- Tokens are generated using `jsonwebtoken`
- Token includes user ID in payload
- Tokens are sent in `Authorization` header: `Bearer <token>`
- Protected routes use `protect` middleware to verify tokens

### Password Security
- Passwords are hashed using `bcryptjs` with salt rounds of 10
- Passwords are never returned in API responses (using `select: false` in schema)
- Password comparison uses `matchPassword` method

### Middleware
- **`protect`**: Verifies JWT token and attaches user to request
- **`admin`**: Checks if user has admin role (for future admin-only routes)
- **`errorHandler`**: Global error handling with proper status codes
- **`logger`**: Logs all incoming requests

## 🌍 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `PORT` | Server port | No | 5000 |
| `CLIENT_URL` | Frontend URL for CORS | No | http://localhost:5173 |
| `NODE_ENV` | Environment (development/production) | No | development |

## 📦 Dependencies

### Production Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT token generation/verification
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **express-validator**: Input validation (available for use)

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "university": "Example University"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Tasks (with token):**
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman
1. Import the API endpoints
2. Set up environment variables for base URL and token
3. Use the token from login/register response in Authorization header

## 🚢 Deployment

### Render Deployment
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`
   - `PORT` (optional, Render sets this automatically)
3. Build command: `npm install`
4. Start command: `npm start`

### Health Check
The API includes a health check endpoint at `/api/health` for monitoring.

## 📝 Error Handling

All errors return JSON responses in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

## 🎯 Milestone 3 Requirements Checklist

✅ **RESTful API with 4+ endpoints**
- Authentication endpoints (register, login, getMe)
- Task CRUD endpoints
- Note CRUD endpoints
- Link CRUD endpoints
- Service CRUD endpoints

✅ **Database Integration (MongoDB)**
- User schema with validation and indexing
- Task schema with relationships
- Note schema
- Link schema
- Service schema
- Proper indexing for performance

✅ **JWT Authentication**
- `/api/auth/register` endpoint
- `/api/auth/login` endpoint
- Password hashing with bcrypt
- JWT token generation
- Protected routes with middleware

✅ **Middleware**
- Global error handler
- Request logging middleware
- CORS configuration
- 404 handler

✅ **Clean Folder Structure**
- Organized by concerns (routes, controllers, models, middleware)
- Separation of concerns
- Modular code structure

## 📚 Additional Resources

- [MongoDB Atlas Setup Guide](./MONGODB_ATLAS_SETUP.md)
- [MongoDB Local Setup Guide](./MONGODB_SETUP.md)

## 👥 Author

CampusHub Backend - CSCE4502 Course Project

## 📄 License

ISC

