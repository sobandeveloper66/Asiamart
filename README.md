# ??? Asiamart - Modern Pan-Asian E-Commerce Platform

Asiamart is a modern, full-stack e-commerce web application featuring imported Asian goods, gourmet foods, beauty products, and lifestyle essentials from Japan, Korea, Thailand, and China. Built with **React**, **Vite**, **Tailwind CSS**, and an **Express / MongoDB** backend with **Razorpay** payment integration.

---

## ? Features

- ?? **Full Shopping Experience**: Category filtering, country-based filtering (Japan, Korea, Thailand, China), search, and live cart management.
- ?? **Secure Checkout & Razorpay Integration**: Fast checkout with real-time Razorpay modal support and order tracking.
- ?? **Reward Coins & Referral System**: Earn and redeem AsiaMart coins on purchases.
- ?? **AI Shopping Assistant**: Interactive chatbot for product queries, recommendations, and instant support.
- ?? **Dark / Light Mode**: Seamless theme toggling with persistent user preference.
- ?? **Authentication & Security**: JWT-based user authentication, password hashing with bcrypt, and profile management.
- ?? **Order Tracking**: Visual status timeline for all orders (Processing, Shipped, Out for Delivery, Delivered).
- ??? **Admin Dashboard**: Manage inventory, view orders, and update order fulfillment status.

---

## ??? Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with fallback local JSON persistence)
- **Payment Gateway**: Razorpay
- **Authentication**: JSON Web Tokens (JWT) & bcrypt

---

## ?? Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Optional: the backend automatically falls back to local storage if MongoDB is not running)

### 2. Installation

Clone the repository:
`ash
git clone https://github.com/YOUR_USERNAME/Asiamart.git
cd Asiamart
`

Install frontend dependencies:
`ash
npm install
`

Install backend dependencies:
`ash
cd server
npm install
cd ..
`

### 3. Environment Setup

#### Backend Configuration:
Create a .env file in the server directory:
`ash
cp server/.env.example server/.env
`
Update server/.env with your values:
`env
PORT=5000
MONGO_URI=mongodb://localhost:27017/asiamart
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
`

#### Frontend Configuration (Optional):
Create a .env file in the root directory:
`ash
cp .env.example .env
`

---

## ?? Running the App

### Start the Backend Server:
`ash
cd server
npm run dev
# Server runs on http://localhost:5000
`

### Start the Frontend Dev Server:
In a new terminal:
`ash
npm run dev
# Frontend runs on http://localhost:5173
`

---

## ?? License
This project is open-source and available under the [MIT License](LICENSE).
