# QuickTask - Personal Task Management Application

<div align="center">

![QuickTask Logo](https://img.shields.io/badge/QuickTask-Task%20Manager-blueviolet?style=for-the-badge)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)](https://www.mongodb.com/mern-stack)
[![Python](https://img.shields.io/badge/Python-Analytics-blue?style=for-the-badge&logo=python)](https://www.python.org/)

**A full-stack task management system with secure authentication, CRUD operations, advanced filtering, and AI-powered analytics**

[Features](#features) • [Tech Stack](#technology-stack) • [Installation](#installation) • [API Docs](#api-documentation) • [Screenshots](#screenshots)

</div>

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Screenshots](#screenshots)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🎯 Project Overview

**QuickTask** is a modern, full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and enhanced with a Python analytics microservice. Users can securely register, manage tasks with full CRUD operations, filter and search tasks, and gain productivity insights through an analytics dashboard.

### Key Highlights

- ✅ **Secure JWT Authentication** - User registration, login, and protected routes
- 📝 **Full Task CRUD** - Create, Read, Update, Delete tasks
- 🔍 **Advanced Filtering** - Search, filter by priority/status, sort by date
- 📊 **Analytics Dashboard** - Python-powered productivity insights
- 🎨 **Modern UI** - Responsive React interface with Chart.js visualizations
- 🏗️ **Clean Architecture** - RESTful APIs, separation of concerns

---

## ✨ Features

### Authentication System
- User registration with email and password
- Secure JWT-based login
- Protected routes requiring authentication
- Session persistence with localStorage
- Logout functionality

### Task Management
- **Create Tasks** - Title, description, priority (Low/Medium/High), status (Todo/In Progress/Completed), due date
- **View Tasks** - Grid layout with task cards
- **Update Tasks** - Edit any task field
- **Delete Tasks** - Remove tasks with confirmation
- **Status Change** - Quick status updates from task cards

### Advanced Features
- **Filter by Priority** - Low, Medium, High
- **Filter by Status** - Todo, In Progress, Completed
- **Search** - Find tasks by title (case-insensitive)
- **Sort** - By created date, due date, or priority (ascending/descending)
- **Reset Filters** - Quick filter reset

### Analytics Dashboard (Python)
- **User Statistics**
  - Total tasks count
  - Completed vs pending tasks
  - Completion percentage
  - Priority distribution (pie chart)
  - Status breakdown (bar graph)

- **Productivity Trends**
  - Tasks per day (last 7 days)
  - Weekly comparison (current vs last week)
  - Average completion time
  - Daily activity visualization

---

## 🛠️ Technology Stack

### Frontend
- **React.js** (v18.2) - UI library
- **React Router DOM** (v6.21) - Client-side routing
- **Axios** (v1.6) - HTTP client
- **Chart.js** (v4.4) & react-chartjs-2 - Data visualization
- **Vite** (v5.0) - Build tool and dev server
- **CSS3** - Styling with modern gradients and animations

### Backend (Node.js)
- **Node.js** - JavaScript runtime
- **Express.js** (v4.18) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.0) - MongoDB object modeling
- **JWT (jsonwebtoken)** (v9.0) - Authentication tokens
- **bcryptjs** (v2.4) - Password hashing
- **CORS** (v2.8) - Cross-origin resource sharing
- **dotenv** (v16.3) - Environment variable management

### Analytics Microservice (Python)
- **FastAPI** (v0.109) - Modern Python web framework
- **PyMongo** (v4.6) - MongoDB driver for Python
- **Uvicorn** (v0.27) - ASGI server
- **Pydantic** (v2.5) - Data validation
- **python-dotenv** (v1.0) - Environment variables

### Development Tools
- **Nodemon** - Auto-restart Node server
- **Thunder Client / Postman** - API testing
- **MongoDB Compass** - Database GUI

---

## 🏗️ Architecture

```
QuickTask/
├── frontend/              # React Application (Port 3000)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context (Auth)
│   │   ├── services/      # API service methods
│   │   ├── utils/         # Utilities (axios config)
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
│
├── backend/               # Node.js + Express API (Port 3001)
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth & error handlers
│   │   └── server.js      # Express server
│   └── package.json
│
├── analytics/             # Python FastAPI Service (Port 5000)
│   ├── app/
│   │   ├── main.py        # FastAPI app
│   │   ├── analytics.py   # Analytics calculations
│   │   ├── database.py    # PyMongo connection
│   │   └── models.py      # Pydantic models
│   └── requirements.txt
│
└── README.md
```

### Request Flow

```
User Request
    ↓
React Frontend (Port 3000)
    ↓
Node.js Backend API (Port 3001)
    ↓
MongoDB Database
    ↓
Python Analytics Service (Port 5000) ← Direct MongoDB access
    ↓
React Dashboard Visualization
```

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/downloads/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/quicktask.git
cd quicktask
```

### Step 2: Setup Backend (Node.js)

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/quicktask
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
PYTHON_SERVICE_URL=http://localhost:5000
```

### Step 3: Setup Python Analytics

```bash
cd ../analytics
pip install -r requirements.txt
```

Create `.env` file in `analytics/` directory:
```env
MONGODB_URI=mongodb://localhost:27017/quicktask
PORT=5000
```

### Step 4: Setup Frontend (React)

```bash
cd ../frontend
npm install
```

Create `.env` file in `frontend/` directory:
```env
VITE_API_URL=http://localhost:3001/api
VITE_ANALYTICS_URL=http://localhost:5000
```

### Step 5: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 6: Run All Services

Open **3 separate terminals**:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:3001

**Terminal 2 - Python Analytics:**
```bash
cd analytics
python -m uvicorn app.main:app --reload --port 5000
```
✅ Analytics running on http://localhost:5000

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:3000

### Step 7: Access Application

Open browser and navigate to: **http://localhost:3000**

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Backend server port | `3001` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/quicktask` |
| `JWT_SECRET` | Secret key for JWT signing | (Required - set your own) |
| `JWT_EXPIRE` | JWT token expiration | `7d` |
| `PYTHON_SERVICE_URL` | Python analytics URL | `http://localhost:5000` |

### Python Analytics (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/quicktask` |
| `PORT` | Analytics server port | `5000` |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3001/api` |
| `VITE_ANALYTICS_URL` | Python analytics URL | `http://localhost:5000` |

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "user": { ... }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "user": { ... }
}
```

### Task Endpoints (All require authentication)

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project proposal",
  "description": "Write Q1 proposal",
  "priority": "High",
  "status": "Todo",
  "dueDate": "2026-01-25T10:00:00Z"
}

Response: 201 OK
{
  "success": true,
  "task": { ... }
}
```

#### Get All Tasks (with filters)
```http
GET /api/tasks?priority=High&status=Todo&search=project&sortBy=dueDate&sortOrder=asc
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "count": 5,
  "tasks": [ ... ]
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>

{
  "status": "In Progress"
}

Response: 200 OK
{
  "success": true,
  "task": { ... }
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Analytics Endpoints (Python)

#### Get User Statistics
```http
GET /user-stats/:userId

Response: 200 OK
{
  "userId": "507f1f77bcf86cd799439011",
  "totalTasks": 25,
  "completedTasks": 15,
  "pendingTasks": 10,
  "completionPercentage": 60.0,
  "priorityBreakdown": {
    "Low": 8,
    "Medium": 10,
    "High": 7
  }
}
```

#### Get Productivity Trends
```http
GET /productivity-trends/:userId

Response: 200 OK
{
  "userId": "507f1f77bcf86cd799439011",
  "tasksPerDay": [ ... ],
  "weeklyStats": { ... },
  "averageCompletionTime": "2.5 days"
}
```

---

## 🗄️ Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  fullName: String (required, min: 2),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min: 6),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)

### Tasks Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', indexed),
  title: String (required, min: 3, max: 100),
  description: String (optional, max: 500),
  priority: Enum ['Low', 'Medium', 'High'] (required),
  status: Enum ['Todo', 'In Progress', 'Completed'] (default: 'Todo'),
  dueDate: Date (required),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId`
- `status`
- `priority`
- `dueDate`
- Compound: `{userId: 1, status: 1}`

---

## 📖 Usage Guide

### 1. Register an Account
1. Navigate to http://localhost:3000
2. Click "Sign Up"
3. Fill in your full name, email, and password (min 6 characters)
4. Click "Register"

### 2. Login
1. Enter your email and password
2. Click "Login"
3. You'll be redirected to the dashboard

### 3. View Dashboard
- See total tasks, completed, pending, and completion rate
- View priority distribution chart
- Check productivity trends and weekly comparison

### 4. Manage Tasks
1. Click "Tasks" in navigation
2. Click "+ New Task" to create a task
3. Fill in task details (title, description, priority, status, due date)
4. Use filters to find specific tasks
5. Click ✏️ to edit or 🗑️ to delete
6. Change status directly from dropdown in task card

### 5. Filter & Search
- Use search box to find tasks by title
- Filter by priority and status
- Sort by created date, due date, or priority
- Click "Reset Filters" to clear all filters

---

## 📸 Screenshots

### Login Page
![Login](docs/screenshots/login.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Task List
![Tasks](docs/screenshots/tasks.png)

### Task Creation
![Create Task](docs/screenshots/create-task.png)

---

## 🧪 Testing

### Backend Testing (Postman/Thunder Client)

1. **Test Authentication:**
   - Register a new user
   - Login with credentials
   - Get current user with token

2. **Test Task CRUD:**
   - Create multiple tasks with different priorities
   - Get all tasks with various filters
   - Update task status
   - Delete a task

3. **Test Edge Cases:**
   - Try to access protected route without token (should fail)
   - Try to update another user's task (should fail)
   - Try invalid email format (should fail)

### Python Analytics Testing

1. Open browser: http://localhost:5000/docs
2. Test `/user-stats/{userId}` endpoint
3. Test `/productivity-trends/{userId}` endpoint
4. Verify calculations match database counts

### Frontend Testing

1. **Authentication Flow:**
   - Register → Login → Dashboard
   - Logout → Try accessing dashboard (should redirect to login)

2. **Task Operations:**
   - Create tasks with all priority levels
   - Search and filter tasks
   - Update task status and details
   - Delete tasks

3. **Analytics:**
   - Verify dashboard statistics match task counts
   - Check chart displays correctly
   - Verify trends data

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running: `mongod`
- Check MongoDB URI in `.env` files
- Verify MongoDB is listening on port 27017

### Python Service Not Working

**Error:** `Failed to fetch analytics`

**Solution:**
- Ensure Python service is running on port 5000
- Check `VITE_ANALYTICS_URL` in frontend `.env`
- Verify Python dependencies installed: `pip list`

### JWT Authentication Failing

**Error:** `Token verification failed`

**Solution:**
- Ensure `JWT_SECRET` is consistent in backend `.env`
- Check token in localStorage (browser dev tools → Application → Local Storage)
- Try logging out and logging in again

### Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3001 | xargs kill -9
```

---

## 📚 Sample Data

### Sample User
```json
{
  "fullName": "Demo User",
  "email": "demo@quicktask.com",
  "password": "demo123"
}
```

### Sample Tasks
```json
[
  {
    "title": "Complete MERN project",
    "description": "Finish QuickTask implementation",
    "priority": "High",
    "status": "In Progress",
    "dueDate": "2026-01-20"
  },
  {
    "title": "Write documentation",
    "description": "Create comprehensive README",
    "priority": "High",
    "status": "Completed",
    "dueDate": "2026-01-18"
  },
  {
    "title": "Test analytics service",
    "description": "Verify Python endpoints",
    "priority": "Medium",
    "status": "Todo",
    "dueDate": "2026-01-22"
  }
]
```

---

## 🚀 Production Deployment

### Backend (Node.js)
- Deploy to **Heroku**, **Railway**, or **Render**
- Set environment variables in platform dashboard
- Use MongoDB Atlas for cloud database

### Frontend (React)
- Deploy to **Vercel**, **Netlify**, or **AWS S3**
- Update `VITE_API_URL` to production backend URL

### Python Analytics
- Deploy to **Render**, **Railway**, or **Heroku**
- Ensure MongoDB connection string points to Atlas

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@raghavendrak04](https://github.com/yourusername)
- Email: Kurapatiraghavendra@gmail.com

---

## 🙏 Acknowledgments

- MongoDB for excellent documentation
- FastAPI for modern Python web framework
- React team for amazing frontend library
- Chart.js for beautiful visualizations

---

<div align="center">

**Built with QuickTask using MERN Stack + Python**

⭐ Star this repo if you found it helpful!

</div>
