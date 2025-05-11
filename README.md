# TechFlick E-Commerce (MERN Stack)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)]()  
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

![TechFlick Logo](/client/public/images/logo.svg)

> **TechFlick: Where Innovation Clicks**

A modern, responsive e-commerce platform for laptops, smartphones, wearables, and more—built with the MERN stack and styled using Bootstrap. This repo contains:

- **client/** – React frontend  
- **server/** – Express backend  
- **db.json** – Mock data for JSON Server  
- **.env.example** – Environment variable templates  

---

## 📁 Repository Structure

```text
techflick-mern-ecommerce/
├── client/               # React app (created via `npx create-react-app client`)
│   ├── public/           # Static assets & index.html
│   │   └── images/       # logo.svg, placeholder product images
│   └── src/
│       ├── assets/       # custom.scss, icons, fonts
│       ├── components/   # Navbar, ProductCard, Modal, etc.
│       ├── context/      # AuthContext.js, CartContext.js
│       ├── hooks/        # useFetch.js, useCart.js
│       ├── pages/        # Home.jsx, Products.jsx, Cart.jsx, etc.
│       ├── routes/       # AppRouter.jsx
│       ├── App.js        # Main App component
│       └── index.js      # React entry point (imports custom.scss)
├── server/               # Express backend
│   ├── controllers/      # productController.js, userController.js
│   ├── middleware/       # authMiddleware.js, errorHandler.js
│   ├── models/           # Product.js, User.js, Order.js
│   ├── routes/           # productRoutes.js, userRoutes.js, orderRoutes.js
│   └── server.js         # App initialization & route mounting
├── db.json               # JSON Server mock data
├── .env.example          # MONGO_URI=, JWT_SECRET=, REACT_APP_API_URL=
└── README.md             # This file
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/<your-username>/techflick-mern-ecommerce.git
cd techflick-mern-ecommerce
```

### 2. Frontend Setup

```bash
# Create and scaffold React app
npx create-react-app client
cd client

# Install dependencies
npm install bootstrap react-bootstrap

# Copy env template
cp .env.example .env
# In .env set REACT_APP_API_URL=http://localhost:5000

# Start dev server
npm start
```

### 3. Backend Setup

```bash
cd ../server
npm install express mongoose dotenv cors
npm install --save-dev nodemon

# Copy env template
cp ../.env.example .env
# In server/.env set:
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_jwt_secret

# Start server with hot reload
npm run dev
```

### 4. JSON Server (Mock API)

```bash
# Install globally if needed
npm install -g json-server

# Run mock API
json-server --watch db.json --port 5000
```

- Frontend: http://localhost:3000  
- Mock API: http://localhost:5000/products  

---

## 🛠️ Features

- **Product Catalog**: Browse, search, filter, sort tech products  
- **Product Details**: Image gallery, specifications, reviews  
- **Shopping Cart**: Add/remove items, adjust quantities, view totals  
- **User Auth**: JWT-based registration & login  
- **Checkout Flow**: Shipping form, payment placeholder  
- **Admin Dashboard**: CRUD for products & orders  
- **Responsive Design**: Mobile-first with Bootstrap  

---

## 📦 Tech Stack

| Layer        | Technology                       |
|--------------|----------------------------------|
| Frontend     | React, React Router, Bootstrap   |
| Backend      | Node.js, Express                 |
| Database     | MongoDB (Mongoose)               |
| Mock Server  | JSON Server                      |
| Deployment   | Vercel (client), Render (server) |
| Version Ctrl | Git & GitHub                     |

---

## 🎨 Design System

- **Primary Color**: `#1e40af` (indigo)  
- **Accent Color**: `#f59e0b` (amber)  
- **Background**: `#f9fafb` (light gray)  
- **Typography**: `Inter`, `Poppins`, or `Roboto`

Override Bootstrap SCSS in `src/assets/custom.scss`:

```scss
$primary: #1e40af;
$body-bg: #f9fafb;
@import "~bootstrap/scss/bootstrap";
```

---

## 📸 Screenshots

![Home Page](/screenshots/home.png)  
![Product Page](/screenshots/product.png)  

---

## 🤝 Contributing

1. Fork this repo  
2. Create a branch: `git checkout -b feature/YourFeature`  
3. Commit changes: `git commit -m "Add YourFeature"`  
4. Push: `git push origin feature/YourFeature`  
5. Open a Pull Request  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Contact

**Ahmed Hassan**  
- GitHub: [AhmedH32](https://github.com/AhmedH32)  
- Email : ahmed.h.moustafa2003@gmail.com  
