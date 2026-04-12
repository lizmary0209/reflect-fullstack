# Reflect — Full-Stack MERN Application

## Overview
Reflect is a full-stack journaling web application designed to help users write, reflect, and track their thoughts in a calm, distraction-free environment.

This project is built as a single full-stack MERN application with a React frontend and a Node.js/Express backend deployed separately.

## Live Application
Frontend:
https://reflect-fullstack.vercel.app/

Backend API:
https://reflect-backend-w00n.onrender.com/

Note: The backend URL is an API service; use the frontend URL to interact with the app.

## Features
- User authentication (sign up, sign in, logout)
- JWT-based authentication with persistent login
- Create, edit, and delete journal entries
- Mood tracking and optional tags per entry
- Daily inspirational quote integration
- User profile page
- Responsive design for mobile and desktop
- Secure, user-specific data access

## Third-Party API Integration
This project integrates the ZenQuotes API to display a daily inspirational quote.

The backend fetches the quote and exposes it through an internal endpoint. The frontend never calls the external API directly.

Endpoint:
GET /api/quote/today

If the external API is unavailable, the backend returns a fallback response to maintain reliability.

## Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- React Router
- Fetch API
- CSS (responsive design)

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Celebrate / Joi

### Infrastructure
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas

## Project Structure
reflect-fullstack/
├── client/
├── server/
└── README.md

## Environment Variables
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
NODE_ENV=production  

## Running Locally

git clone https://github.com/lizmary0209/reflect-fullstack.git  
cd reflect-fullstack  

Frontend:
cd client  
npm install  
npm run dev  

Backend:
cd ../server  
npm install  
npm run dev  

App runs at:
http://localhost:3001  

## Authentication Flow
- Passwords are hashed before storage
- JWT is issued on login
- JWT is stored in localStorage
- Protected routes require a valid token
- Users remain logged in after refresh
- Users can only access their own data

## API Endpoints

Auth:
- POST /api/signup
- POST /api/signin
- GET /api/users/me

Entries:
- GET /api/entries
- POST /api/entries
- PATCH /api/entries/:id
- DELETE /api/entries/:id

Quotes:
- GET /api/quote/today

## Challenges & Solutions

### 1. Frontend and Backend Deployment Mismatch
**Challenge:**  
After deployment, API requests were returning 404 errors because the frontend was calling relative paths instead of the deployed backend.

**Solution:**  
Implemented environment-based configuration using `VITE_API_URL` and ensured all API requests used a centralized base URL. Updated Vercel environment variables and redeployed the frontend.

---

### 2. Incorrect Branch Deployment
**Challenge:**  
Both Render and Vercel were deploying outdated code from the wrong branch, causing inconsistencies between local development and production.

**Solution:**  
Identified branch mismatch and updated deployment settings to use the correct branch. Merged working branch into `main` for consistent production deployments.

---

### 3. Backend Serving Frontend Build in Production
**Challenge:**  
The backend attempted to serve a frontend build (`client/dist`) that did not exist in the Render environment, causing runtime errors.

**Solution:**  
Removed static file serving from the backend and separated frontend and backend deployments (Vercel + Render).

---

### 4. MongoDB Authentication Errors in Production
**Challenge:**  
Initial deployment failed due to incorrect MongoDB connection string configuration.

**Solution:**  
Reconfigured environment variables in Render and verified correct database credentials and connection URI format.

---

### 5. Slow Initial Load from Backend
**Challenge:**  
The backend experienced slow initial responses due to cold starts on Render.

**Solution:**  
Confirmed expected behavior for free-tier hosting and implemented loading states on the frontend to improve user experience.

---

## Demo Videos

Frontend:
https://drive.google.com/file/d/1JlC-p9ySAa8aapVgu3yQoe7SNLADsIqL/view

Backend:
https://drive.google.com/file/d/1kFMDfYWHF8NX9wADQ7j3apM2x69X0vHM/view

## Author
Lizmary Chardon  
Software Engineer | Full-Stack MERN