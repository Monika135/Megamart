# Megamart
# 🛒 E-Commerce Application (Node.js + MongoDB)

A simple yet functional **e-commerce web application** built with **Node.js, Express, and MongoDB Atlas**.  
It includes **user authentication, product management, and dynamic EJS-based pages**.

---

## 🚀 Features

### 🔐 User Authentication
- Login & session management with `express-session` + `cookie-parser`.
- **Role-based access control**: User / Admin.
- ⚠️ Demo-only: credentials stored in `users.txt`.  
  👉 For production, move to **MongoDB with password hashing**.

### 📦 Product Management
- Full **CRUD** (Create, Read, Update, Delete) for products.
- Products stored in **MongoDB Atlas** via `/products` routes.
- Initial homepage loads sample data from `products.json`.  
  👉 Future: consolidate all product data into MongoDB.

### 🖥️ Dynamic Views
- **EJS Templating** for rendering pages.
- Views include:  
  - `login`, `dashboard`, `index` (homepage)  
  - `productDetails`  
  - Product management: `ShowAll`, `Show`, `create`, `edit`, `delete`.

### ⚙️ Middleware & Utilities
- `express.urlencoded` → parse request body  
- `cookie-parser` → cookie handling  
- `express-session` → session management  
- `express.static` → serve CSS/JS/images  

### 🗄️ MongoDB Atlas
- Persistent product storage in **MongoDB Atlas cluster**.
- Includes **error handling** for DB connection failures.

---

## 🛠️ Setup & Installation

### ✅ Prerequisites
- Node.js (LTS recommended)  
- MongoDB Atlas cluster  
- `users.txt` file → sample credentials (JSON)  
- `products.json` file → sample products (JSON)

### ⚡ Install
```bash
git clone <your-repository-url>
cd eComm
npm install

