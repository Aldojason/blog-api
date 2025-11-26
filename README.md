Blog App – Full Stack (React + TypeScript + Express)

A full-stack blog application built using React (Vite), TypeScript, Express.js, and Axios.
Backend is deployed on Railway and frontend on Netlify.

Live Links
Backend (API)
https://blog-api-production-4be4.up.railway.app

Frontend (Netlify)
https://jaz-blog.netlify.app

API Base URL
https://blog-api-production-4be4.up.railway.app/api

Tech Stack
Frontend

React (Vite)

TypeScript

Axios

Tailwind CSS

Backend

Node.js

Express.js

TypeScript

CORS

Deployment

Railway (Backend)

Netlify (Frontend)

Features

Create a blog post

View all blog posts

Backend API with TypeScript

Clean responsive UI with Tailwind

Project Structure
blog-api/
  blog-backend/
    src/
      controllers/
      routes/
      index.ts
  blog-frontend/
    src/
      App.tsx
      api.ts
      main.tsx

Backend Setup
cd blog-backend
npm install
npm run dev

Production Build
npm run build
npm start

Frontend Setup
cd blog-frontend
npm install
npm run dev

API Configuration

Update blog-frontend/src/api.ts:

export const api = axios.create({
  baseURL: "https://blog-api-production-4be4.up.railway.app/api"
});

License

Free to use for learning and personal projects.
