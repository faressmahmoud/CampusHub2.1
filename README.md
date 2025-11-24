# CampusHub

A simple, distraction-free web-based planner for university students in Cairo. Organize your daily academic tasks, deadlines, quick notes, and important links in one place.

## Features

- ✅ **Authentication System**: Login and registration with localStorage
- ✅ **Task Management**: Create, edit, and track tasks with due dates, priorities, and status
- ✅ **Notes & Links**: Keep quick notes and save important links
- ✅ **Dashboard**: Overview of your academic progress and upcoming deadlines
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ✅ **Privacy-First**: All data stored locally in your browser

## Tech Stack

- React (no TypeScript)
- React Router for navigation
- Tailwind CSS for styling
- localStorage for data persistence (no backend)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd CampusHub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:5173`

## Usage

### First Time Setup

On first load, a demo user is automatically created:
- **Email**: `demo@student.com`
- **Password**: `demo123`

You can use this account to explore the app, or register a new account.

### Registering a New Account

1. Click "Register here" on the login page
2. Fill in your details:
   - Full Name (required)
   - Email (required)
   - Password (minimum 6 characters)
   - University (select from Cairo universities list)
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

## Project Structure

```
CampusHub/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotesPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── TasksPage.jsx
│   ├── utils/
│   │   ├── auth.js
│   │   └── placeholderData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## Data Storage

All data is stored in the browser's localStorage:
- User accounts: `users`
- Current session: `currentUser`
- User-specific data: `tasks_<email>`, `notes_<email>`, `links_<email>`

## Supported Universities

- The American University in Cairo (AUC)
- Cairo University
- Ain Shams University
- Helwan University
- German University in Cairo (GUC)
- Nile University
- Other (with custom input)

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is created for educational purposes.
