# ContestHub

A full-stack Coding Contest Aggregator Platform that brings together upcoming, live, and past coding contests from Codeforces, LeetCode, and CodeChef — all in one place.

---

## Live Demo

- **Frontend** — [contesthub.vercel.app](https://contesthub.vercel.app) *(coming soon)*
- **Backend API** — [contesthub-api.onrender.com](https://contesthub-api.onrender.com) *(coming soon)*

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Authentication Flow](#authentication-flow)
- [State Management](#state-management)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Author](#author)

---

## Overview

ContestHub solves the problem of visiting multiple platforms to track coding contests. Developers can log in, see all contests in one dashboard, bookmark their favorites, add personal notes, and get email reminders before contests begin.

---

## Features

- **Contest Aggregator** — Fetches contests from Codeforces, LeetCode, and CodeChef in real time
- **Filter & Search** — Filter by platform, status (upcoming / live / past), and search by name
- **Authentication** — Secure signup and login using JWT and bcrypt
- **Bookmarks** — Save contests to revisit later, stored per user in MongoDB
- **Notes** — Write personal notes against any contest
- **Countdown Timers** — Live countdown for every upcoming contest
- **Email Reminders** — Automated reminders via nodemailer + node-cron
- **Browser Notifications** — Push notification when a contest is about to start
- **User Profile & Stats** — Track bookmarks, notes, and favorite platforms
- **Dark Mode** — Full dark/light theme toggle
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Loading Skeletons** — Smooth loading experience

---

## Tech Stack

### Frontend
- **React 18** — Component-based UI
- **Vite** — Build tool with HMR
- **Tailwind CSS** — Utility-first styling
- **React Router DOM** — Client-side routing
- **Axios** — HTTP requests with interceptors
- **React Context API** — Global state management
- **React Hot Toast** — Notifications
- **date-fns** — Date formatting
- **@heroicons/react** — Icons

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — ODM for MongoDB
- **JWT (jsonwebtoken)** — Authentication tokens
- **bcryptjs** — Password hashing
- **node-cron** — Scheduled background jobs
- **Nodemailer** — Email notifications
- **Axios** — External API calls
- **dotenv** — Environment variables
- **express-rate-limit** — Rate limiting
- **cors** — Cross-origin resource sharing

### Database & Deployment
- **MongoDB Atlas** — Cloud database
- **Vercel** — Frontend hosting
- **Render** — Backend hosting

---

## Project Architecture

```
                   ┌─────────────────────────────┐
                   │         USER BROWSER         │
                   │   React + Vite + Tailwind    │
                   └──────────────┬──────────────┘
                                  │ HTTP (Axios)
                   ┌──────────────▼──────────────┐
                   │       EXPRESS SERVER         │
                   │        (Render.com)          │
                   │                             │
                   │  ┌─────────────────────┐   │
                   │  │      MIDDLEWARE       │   │
                   │  │  JWT Auth + CORS +   │   │
                   │  │  Rate Limiter        │   │
                   │  └──────────┬───────────┘   │
                   │  ┌──────────▼───────────┐   │
                   │  │       ROUTES          │   │
                   │  │  /auth /contests      │   │
                   │  │  /bookmarks /notes    │   │
                   │  └──────────┬───────────┘   │
                   │  ┌──────────▼───────────┐   │
                   │  │     CONTROLLERS       │   │
                   │  │  Business Logic       │   │
                   │  └──────────┬───────────┘   │
                   │  ┌──────────▼───────────┐   │
                   │  │      SERVICES         │   │
                   │  │  Codeforces API       │   │
                   │  │  LeetCode (Kontests)  │   │
                   │  │  CodeChef (Kontests)  │   │
                   │  └──────────┬───────────┘   │
                   │  ┌──────────▼───────────┐   │
                   │  │    node-cron JOB      │   │
                   │  │  Email Reminders      │   │
                   │  └───────────────────────┘   │
                   └──────────────┬──────────────┘
                                  │
                   ┌──────────────▼──────────────┐
                   │        MONGODB ATLAS         │
                   │  Users | Contests | Notes   │
                   │  Bookmarks                  │
                   └─────────────────────────────┘
```

---

## Folder Structure

```
ContestHub/
│
├── client/                          # React Frontend
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── axios.js             # Axios instance + auth interceptor
│       ├── assets/
│       ├── components/
│       │   ├── auth/
│       │   │   ├── LoginForm.jsx
│       │   │   └── SignupForm.jsx
│       │   ├── contest/
│       │   │   ├── ContestCard.jsx
│       │   │   ├── ContestFilter.jsx
│       │   │   ├── ContestList.jsx
│       │   │   └── CountdownTimer.jsx
│       │   ├── layout/
│       │   │   ├── Layout.jsx
│       │   │   ├── Navbar.jsx
│       │   │   └── Sidebar.jsx
│       │   ├── notes/
│       │   │   ├── NoteCard.jsx
│       │   │   └── NoteModal.jsx
│       │   └── ui/
│       │       ├── Badge.jsx
│       │       ├── Button.jsx
│       │       ├── Modal.jsx
│       │       ├── SearchBar.jsx
│       │       ├── Skeleton.jsx
│       │       └── Spinner.jsx
│       ├── context/
│       │   ├── AuthContext.jsx      # User auth state
│       │   ├── ContestContext.jsx   # Contests + filters state
│       │   └── ThemeContext.jsx     # Dark/light mode
│       ├── hooks/
│       │   ├── useAuth.js
│       │   ├── useBookmarks.js
│       │   ├── useContests.js
│       │   └── useCountdown.js
│       ├── pages/
│       │   ├── Bookmarks.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── NotFound.jsx
│       │   ├── Notes.jsx
│       │   ├── Profile.jsx
│       │   └── Signup.jsx
│       ├── routes/
│       │   ├── AppRoutes.jsx
│       │   └── ProtectedRoute.jsx
│       ├── utils/
│       │   ├── formatDate.js
│       │   ├── formatDuration.js
│       │   └── platformColors.js
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── nodemailer.js            # Email transporter
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── bookmark.controller.js
│   │   ├── contest.controller.js
│   │   ├── note.controller.js
│   │   └── user.controller.js
│   ├── jobs/
│   │   └── reminder.job.js          # Cron job for email reminders
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT verification
│   │   ├── error.middleware.js      # Global error handler
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── Bookmark.model.js
│   │   ├── Contest.model.js
│   │   ├── Note.model.js
│   │   └── User.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── bookmark.routes.js
│   │   ├── contest.routes.js
│   │   ├── note.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── codechef.service.js
│   │   ├── codeforces.service.js
│   │   ├── contest.aggregator.js
│   │   └── leetcode.service.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── asyncHandler.js
│   ├── app.js
│   ├── server.js
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## Database Schema

### User
```
_id         : ObjectId
name        : String   (required)
email       : String   (required, unique)
password    : String   (hashed with bcrypt)
preferences : {
  platforms : [String]
  darkMode  : Boolean
}
createdAt   : Date
```

### Contest (Cache Layer)
```
_id        : ObjectId
externalId : String
platform   : String   (codeforces | leetcode | codechef)
name       : String
startTime  : Date
duration   : Number   (in seconds)
url        : String
status     : String   (upcoming | live | past)
fetchedAt  : Date     (TTL index — auto expires in 1 hour)
```

### Bookmark
```
_id        : ObjectId
userId     : ObjectId  (ref: User)
contestId  : String
platform   : String
name       : String
startTime  : Date
url        : String
savedAt    : Date
```

### Note
```
_id        : ObjectId
userId     : ObjectId  (ref: User)
contestId  : String
platform   : String
content    : String
createdAt  : Date
updatedAt  : Date
```

---

## API Reference

### Auth Routes
```
POST   /api/auth/signup         - Register new user
POST   /api/auth/login          - Login and get JWT
GET    /api/auth/me             - Get logged-in user [Protected]
```

### Contest Routes
```
GET    /api/contests            - Get all contests [Public]
                                  Query: ?platform=&status=&search=
GET    /api/contests/:id        - Get single contest [Public]
```

### Bookmark Routes
```
GET    /api/bookmarks           - Get user bookmarks [Protected]
POST   /api/bookmarks           - Add a bookmark [Protected]
DELETE /api/bookmarks/:id       - Remove a bookmark [Protected]
```

### Note Routes
```
GET    /api/notes               - Get user notes [Protected]
POST   /api/notes               - Create a note [Protected]
PUT    /api/notes/:id           - Update a note [Protected]
DELETE /api/notes/:id           - Delete a note [Protected]
```

### User Routes
```
GET    /api/user/profile        - Get profile [Protected]
GET    /api/user/stats          - Get stats [Protected]
PUT    /api/user/preferences    - Update preferences [Protected]
```

---

## Authentication Flow

```
SIGNUP / LOGIN
  - Password hashed with bcrypt (salt rounds: 10)
  - JWT signed with JWT_SECRET (expires in 7 days)
  - Token returned to client

CLIENT STORAGE
  - Token saved in localStorage
  - Axios interceptor attaches token to every request
    Header: Authorization: Bearer <token>

PROTECTED ROUTES — Backend
  - auth.middleware.js extracts token from header
  - jwt.verify() decodes userId
  - req.user set for controller use

PROTECTED ROUTES — Frontend
  - ProtectedRoute.jsx checks AuthContext
  - No token → redirect to /login
  - Token present → render page
```

---

## State Management

Three React Contexts manage global state:

```
App
 └── AuthContext       → user, token, login(), logout(), isLoading
     └── ThemeContext  → isDark, toggleTheme() [persisted to localStorage]
         └── ContestContext → contests[], filters, searchQuery, loading
```

- **AuthContext** — handles login, logout, token persistence
- **ThemeContext** — dark/light mode toggle with localStorage persistence
- **ContestContext** — fetches contests from backend, applies filters and search

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/devendra529/ContestHub.git
cd ContestHub
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env
# Fill in your environment variables in .env
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
# Create .env and add VITE_API_BASE_URL=http://localhost:5000/api
npm run dev
```

### 4. Open in Browser

```
Frontend  →  http://localhost:5173
Backend   →  http://localhost:5000
```

---

## Environment Variables

### server/.env
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/contesthub
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
```

### client/.env
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Deployment

### Step 1 — MongoDB Atlas
- Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
- Add your Render server IP to the IP whitelist
- Copy the connection string into `MONGO_URI`

### Step 2 — Backend on Render
- Go to [render.com](https://render.com) → New Web Service
- Connect your GitHub repo
- Set Root Directory to `server`
- Add all environment variables
- Deploy

### Step 3 — Frontend on Vercel
- Go to [vercel.com](https://vercel.com) → New Project
- Import your GitHub repo
- Set Root Directory to `client`
- Add `VITE_API_BASE_URL` pointing to your Render URL
- Deploy

---

## External APIs Used

| Platform   | Source                                   | Auth Required |
|------------|------------------------------------------|---------------|
| Codeforces | https://codeforces.com/api/contest.list  | No            |
| LeetCode   | https://kontests.net/api/v1/leet_code    | No            |
| CodeChef   | https://kontests.net/api/v1/code_chef    | No            |

---

## Author

**Devendra Pratap Singh**
- GitHub: [@devendra529](https://github.com/devendra529)

---

## License

This project is open source and available under the [MIT License](LICENSE).