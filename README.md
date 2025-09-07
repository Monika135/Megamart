# Megamart
🛒 E-Commerce Application (Node.js + MongoDB)

A basic e-commerce web application built with Node.js, Express, and MongoDB Atlas, featuring user authentication, product management, and dynamic EJS templating.

🚀 Key Features
🔐 User Authentication

Login & session management with express-session + cookie-parser.

Basic role-based access control (User/Admin).

⚠️ Currently using a local users.txt (JSON). 👉 Should migrate to MongoDB with secure password hashing for production.

📦 Product Management

Full CRUD (Create, Read, Update, Delete) for products.

Products stored in MongoDB Atlas (/products routes).

Homepage & details initially load sample data from products.json (mixed source). 👉 Future improvement: unify in MongoDB.

🖥️ Dynamic Content

EJS templating for rendering pages.

Views: login, dashboard, index (homepage), productDetails, and product management (ShowAll, Show, create, edit, delete).

⚙️ Middleware & Tools

express.urlencoded → request body parsing

cookie-parser → cookie handling

express-session → session management

express.static → serve static assets (CSS, JS, images)

🗄️ MongoDB Atlas Integration

Connects to MongoDB Atlas cluster for persistent storage.

Includes error handling for DB connection failures.

📂 Project Setup
✅ Prerequisites

Node.js (LTS recommended)

MongoDB Atlas cluster

users.txt → sample user credentials (JSON)

products.json → sample product data (JSON)

⚡ Installation
git clone <your-repo-url>
cd eComm
npm install

🔑 Configuration

Update server.js with your MongoDB URI:

"mongodb+srv://<username>:<password>@<cluster-address>/?retryWrites=true&w=majority"


👉 Store credentials in .env (not in code).

▶️ Run App
node server.js


You should see:

✅ Connected to MongoDB

🚀 Server started on http://localhost:5000

Open http://localhost:5000
 in your browser.

🛠️ Tech Stack

Node.js + Express – backend framework

MongoDB Atlas – NoSQL database

EJS – templating engine

Middleware: cookie-parser, express-session, body-parser
