# Reflect — Full-Stack MERN Application

Reflect is a calm, full-stack journaling web application designed to help users write, reflect, and track their thoughts in a peaceful, distraction-free environment.

This project is built as a **single full-stack MERN application** with a React frontend and a Node.js/Express backend, deployed together as one service.

---

## 🌐 Live Application

**Deployed URL (Google Cloud Run):**  
https://reflect-241770940238.us-east1.run.app

---

## ✨ Features

- User authentication (sign up / sign in)
- JWT-based authentication with persistent login
- Create, edit, and delete personal journal entries
- Mood tracking and optional tags per entry
- Daily inspirational quote powered by a third-party API
- User profile page
- Responsive design for mobile and desktop
- Secure, user-specific data access

---

## 🧠 Third-Party API Integration

This project integrates the **ZenQuotes API** to display a daily inspirational quote.

### How it works
- The **backend** fetches data from the ZenQuotes API
- The frontend **never calls the external API directly**
- The frontend requests quotes from the backend endpoint:

```http
 GET /api/quote/today

 - If the external API is unavailable, the backend provides a graceful fallback response

This approach ensures security, reliability, and proper separation of concerns.
```
---

## 🛠 Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- React Router
- Fetch API
- Custom CSS (responsive design)

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Celebrate / Joi (request validation)

### Infrastructure
- Google Cloud Run (deployment)
- MongoDB Atlas (cloud database)
- Docker (containerized build)

---

## 📁 Project Structure
reflect-fullstack/
├── client/ # React frontend
├── server/ # Express backend
├── Dockerfile # Cloud Run build configuration
├── .dockerignore
└── README.md

---

## ⚙️ Environment Variables

The backend requires the following environment variables:
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
When deployed, these variables are configured directly in **Google Cloud Run**.

---

## 🚀 Running Locally

### Prerequisites
- Node.js
- npm
- MongoDB (local or Atlas)

### Steps

```bash
git clone https://github.com/lizmary0209/reflect-fullstack.git
cd reflect-fullstack 
```
---

## Frontend build
- cd client
- npm install
- npm run build

## Backend 
- cd ../server
- npm install
- npm run dev

The app will be available at:
http://localhost:3001

## 🔐 Authentication Flow

- Passwords are hashed before storage
- JWT is issued on successful login
- JWT is stored in localStorage
- Protected routes require a valid JWT
- User remains logged in after refresh
- Users can only access their own data

## 📡 API Endpoints
 # Auth
- POST /api/signup — register a new user
- POST /api/signin — authenticate user
- GET /api/users/me — get current user

 # Journal Entries
- GET /api/entries — get all entries
- POST /api/entries — create entry
- PATCH /api/entries/:id — update entry
- DELETE /api/entries/:id — delete entry

# Quotes
- GET /api/quote/today — fetch daily inspirational quote

## 🎥 Demo Videos
# Frontend Walkthrough

https://drive.google.com/file/d/1JlC-p9ySAa8aapVgu3yQoe7SNLADsIqL/view

# Backend Walkthrough

https://drive.google.com/file/d/1kFMDfYWHF8NX9wADQ7j3apM2x69X0vHM/view

## 👩‍💻 Author

Lizmary Chardon
Software Engineering Student — TripleTen
