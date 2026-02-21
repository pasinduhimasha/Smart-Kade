# Smart Kade 

**Smart Kade** is a modern full-stack online food ordering web application built with **React.js (Vite)**, **Node.js**, **Express REST API**, and **MongoDB (local)**.

Users can browse and search the menu, filter by categories, view today’s offers, place orders, and download detailed bills.  

Admins can securely manage menu items and offers through protected API routes. The backend REST API was tested using **Postman**.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Demo Credentials](#demo-credentials)
- [Setup Instructions](#setup-instructions)
- [Author](#author)
- [License](#license)

---

## Features

- Browse the full menu with category filters and search functionality
- View today’s special offers
- User accounts with secure JWT authentication
- Place orders and download detailed bills
- Secure Admin Dashboard
  - Add new menu items
  - Update existing items
  - Delete items
  - Manage special offers
- RESTful API architecture
- Responsive design for desktop and mobile

---

## Tech Stack

### Frontend
- React.js (Vite)
- React Router
- CSS / Tailwind

### Backend
- Node.js
- Express.js (RESTful API)

### Database
- MongoDB (Local)

### Authentication
- JSON Web Token (JWT)

### API Testing
- Postman

### Version Control
- Git & GitHub

---

## Screenshots

| Page | Screenshot |
|------|-----------|
| Home | ![Home](smart-kade-api/screenshots/Home.jpg) |
| About | ![About](smart-kade-api/screenshots/About.jpg) |
| Why Choose Us | ![WhyChooseUs](smart-kade-api/screenshots/WhyChooseUs.jpg) |
| Admin Login | ![AdminLogin](smart-kade-api/screenshots/AdminLogin.jpg) |
| User Login | ![Login](smart-kade-api/screenshots/login.jpg) |
| Register | ![Register](smart-kade-api/screenshots/Register.jpg) |
| Menu | ![Menu](smart-kade-api/screenshots/Menu.jpg) |
| Manage Items | ![ManageItems](smart-kade-api/screenshots/manageitems.jpg) |
| Add Item | ![AddItem](smart-kade-api/screenshots/Additeam.jpg) |
| Add Offer | ![AddOffer](smart-kade-api/screenshots/addoffer.jpg) |
| Bill | ![Bill](smart-kade-api/screenshots/bill.jpg) |

---

## Demo Credentials

###  User
- Email: `pasindu@gmail.com`
- Password: `123456`

###  Admin
- Email: `admin@gmail.com`
- Password: `123456`

---

## Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pasinduhimasha/Smart-Kade.git
cd Smart-Kade
2️⃣ Start MongoDB (Database)

Make sure MongoDB is installed. Then run:

mongod

This starts the local MongoDB server.

3️⃣ Run Backend Server (Authentication & API)

Open a new terminal:

cd smart-kade-api
npm install
nodemon server.js

This runs the Express REST API server for authentication, items, offers, and orders.

Backend runs on:

http://localhost:5000
4️⃣ Run Frontend (React App)

Open another new terminal:

cd smart-kade-frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
Author

Pasindu Himasha

License

This project is created for educational and portfolio purposes.
You are free to explore, learn from, and improve the system.
