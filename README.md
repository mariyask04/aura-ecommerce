# Aura E-Commerce

A full-stack e-commerce web application built using the MERN stack with Next.js. The application allows users to browse products, search and filter products, add items to cart, place orders, and manage their shopping experience through a modern and responsive interface.

## Features

### Authentication
User Registration
User Login
JWT Authentication
Protected Routes

### Products
View All Products
Product Search
Product Price Filtering
Product Details Page
Multiple Product Images

### Cart
Add Products to Cart
Update Product Quantity
Remove Products from Cart
View Cart Total

### Orders
Checkout Form
Place Orders
Store Orders in MongoDB

### UI & UX
Responsive Design
Framer Motion Animations
Loading Skeletons
Toast Notifications
Hover Effects and Smooth Transitions

## Tech Stack

### Frontend
Next.js
React
JavaScript (ESM)
Tailwind CSS
Framer Motion
Axios
React Hot Toast

### Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs

### Deployment
Vercel (Frontend)
Render (Backend)
MongoDB Atlas

## Project Structure

aura-ecommerce
│
├── client
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── services
│   │   ├── utils
│   │   └── context
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
│
└── README.md

## API Endpoints

### Authentication

POST /api/auth/register
POST /api/auth/login

### Products

GET /api/products
GET /api/products/:id

### Cart

POST /api/cart
GET /api/cart
PUT /api/cart/:id
DELETE /api/cart/:id

### Orders

POST /api/orders
GET /api/orders

## Database Collections

### Users

{
  email,
  password
}

### Products

{
  name,
  price,
  description,
  images
}

### Cart

{
  user,
  product,
  quantity
}

### Orders

{
  customerName,
  address,
  mobile,
  user,
  items,
  total
}

## Installation

### Clone Repository

git clone https://github.com/mariyask04/aura-ecommerce

### Backend Setup

cd server
npm install

Create a '.env' file:

PORT=5000
MONGO_URI
JWT_SECRET

Run backend:
npm run dev

### Frontend Setup

cd client
npm install

Create a '.env.local' file:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Run frontend:
npm run dev

## Bonus Features Implemented

Product Search
Product Filtering
JWT Authentication
Fully Responsive Design
Advanced Animations
Live Deployment

## Live Links

Frontend: https://aura-ecommerce-tan.vercel.app
Backend: https://aura-ecommerce-o6fr.onrender.com

## Author

Mariya Shaikh
GitHub: https://github.com/mariyask04