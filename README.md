# 🏥 Hospital Management System - Backend

A RESTful backend API for a Hospital Management System built using **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

## 🚀 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Role Based Access Control (RBAC)

---

## 📁 Project Structure

```
src/
├── lib/               # Database connection
├── middleware/        # Authentication middleware
├── prisma/            # Prisma schema & seed
├── routes/            # API routes
└── index.ts           # Entry point
```

---

## ⚙️ Prerequisites

- Node.js (v18+)
- PostgreSQL
- npm

---

## 📥 Installation

### 1. Clone the repository

```bash
https://github.com/dikshant261/hospital-backend.git
```

### 2. Go to the project directory

```bash
cd hospital-backend
```

### 3. Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/hospital_db"
JWT_SECRET="your-secret-key"
Frontend_Url = http://localhost:5173
```

---

## 🗄️ Database Setup

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### (Optional) Seed Database

```bash
npx prisma db seed
```

---

## ▶️ Run the Project

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

---

## 📌 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Compile TypeScript
npm start          # Run compiled project
```

---

## 🔑 Authentication

The API uses **JWT Authentication**.

After logging in, include the token in the request header.

```
Authorization: Bearer <your_token>
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/login` | User Login |

### Menus

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/menus` | Get menus according to logged-in user's roles |

---

## 👨‍💻 Features

- JWT Authentication
- Role Based Access Control (RBAC)
- Menu Permission Management
- PostgreSQL Database
- Prisma ORM
- TypeScript Support
- Express REST API

---

## 🛠️ Future Improvements

- Refresh Token
- Password Hashing (bcrypt)
- User Management
- Role Management
- Menu CRUD
- Doctor Module
- Patient Module
- Appointment Module

---
.
