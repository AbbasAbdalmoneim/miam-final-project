🎟️ Event Booking Platform

A full-stack web application for managing events, booking seats, and handling ticket payments.
Built with React + TypeScript + TailwindCSS on the frontend and Express + MongoDB (Mongoose) on the backend.

🚀 Features

🔑 User authentication (login/register, JWT-based).

🎭 Event listing & detailed event pages.

🪑 Interactive seat selection with live pricing.

💳 Ticket booking & payment simulation.

🛠️ Admin panel to manage users & events.

📱 Responsive & modern UI.

🛠️ Tech Stack

Frontend

React + TypeScript

TailwindCSS

React Router

Context API (for auth, events, and booking)

Backend

Node.js + Express

MongoDB + Mongoose

JWT Authentication

REST API endpoints

📂 Project Structure
project-root/
│── backend/              # Express + MongoDB API
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes (users, events, tickets)
│   └── server.ts         # Main entry point
│
│── frontend/             # React app
│   ├── src/
│   │   ├── components/   # UI Components (Seats, Navbar, etc.)
│   │   ├── contexts/     # Global Context Providers
│   │   ├── pages/        # App pages (EventDetails, ManageUsers, etc.)
│   │   └── App.tsx
│
└── README.md

⚙️ Installation & Setup
1. Clone the repo
git clone https://github.com/AbbasAbdalmoneim/miam-final-project.git
cd your-repo

2. Backend Setup
cd server
npm install

Run the backend:

npm run dev


🔗 API Endpoints
Users

GET /api/users → Get all users

POST /api/users/register → Register new user

POST /api/users/login → Login user

Events

GET /api/events → Get all events

GET /api/events/:id → Get single event details

Tickets

POST /api/tickets → Book tickets

GET /api/tickets/:id → Get ticket details

#Regarding some problems I have to shutdown the netlfy url so here is new url after solvign all the problems 
###Also HEROKU needs visa and I dont have one so i use netlfy. 

leafy-arithmetic-153f01.netlify.app

####admin account to see admin panel:
admin007@gmail.com

abbas2004

