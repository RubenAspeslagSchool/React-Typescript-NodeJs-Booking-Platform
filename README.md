# React-Typescript-NodeJs-Booking-Platform

## 🧱 Architecture

**Client Web App** (React + TypeScript)


**Backend API** (Node.js + Express + TypeScript)


---

## 🔗 Communication

* All apps communicate with the backend via **REST APIs**.
* Real-time updates via **WebSockets** or **Socket.IO** (e.g., for admins to view live bookings).
* Optional: email notifications via **NodeMailer**.

## 🚀 Setup Instructions

1. Run the provided SQL script on a MySQL server.
2. In `server/src/data/mysqlConnectionPool.ts`, adjust the connection pool settings for your MySQL server.
3. Open a terminal and run:

```po
cd server
npm install
npm start
```

4. Open another terminal and run:

```powershell
cd clientwebapp
npm install
npm start
```

🧱 Architecture:

Client Web App (React + TypeScript)
For users to browse locations, book spaces, and manage their reservations.

Backend API (Node.js + Express + TypeScript)
Handles authentication, bookings, availability, payments, and notifications.

🔗 Communication:

All apps communicate with the backend via REST APIs.
Realtime updates via WebSockets or Socket.IO (e.g., for admin to see live bookings).
Optional: add email notifications (NodeMailer).

📂 Folder Structure

```
React-Typescript-NodeJs-Booking-Platform/
│
├── clientwebapp/         # React + TypeScript front-end
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── domain/       # Shared domain models
│   │   └── data/         # API wrappers
│
├── server/               # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── data/         # Repositories and DB connections
│   │   ├── domain/       # Shared types & interfaces
│   │   └── routes/       # API endpoints
│
└── README.md
```

