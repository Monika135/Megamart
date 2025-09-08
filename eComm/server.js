const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { MongoClient, ObjectId } = require("mongodb"); // Destructure ObjectId here

const app = express();
const oneday = 1000 * 60 * 60 * 24;

let dbinstance;
MongoClient.connect(
  "mongodb+srv://Userroot:Blog1357@cluster0.piqcrsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useUnifiedTopology: true }
)
  .then((client) => {
    dbinstance = client.db("EComm");
    console.log("✅ Connected to MongoDB");

    // Export dbinstance for other modules after it's successfully assigned
    module.exports.dbinstance = dbinstance;

    // ✅ Middleware
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(
      session({
        saveUninitialized: false,
        resave: false,
        secret: "asd#$3112",
        cookie: { maxAge: oneday, httpOnly: true },
      })
    );
    app.use(express.static("public"));

    // ✅ Authentication Middleware
    function isAuthenticated(req, res, next) {
      if (req.session.username) return next();
      res.redirect("/login");
    }

    function auth(req, res, next) {
      if (req.session.username === "user") return next();
      if (req.session.username === "admin") return res.redirect("/products/");
      res.redirect("/");
    }

    // ✅ Routes
    const authRoutes = require("./routing/authroutes");
    app.use("/users", isAuthenticated, auth, authRoutes);

    const productRoutes = require("./routing/productroutes");
    app.use("/products", isAuthenticated, productRoutes);

    // ✅ Login Routes
    app.get("/login", (req, res) => {
      res.render("login", { message: "" });
    });

    app.post("/login", (req, res) => {
      fs.readFile("users.txt", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error while reading users.");
        }

        let users;
        try {
          users = JSON.parse(data);
        } catch (e) {
          console.error("Invalid JSON in users.txt");
          return res.status(500).send("Server error in users file.");
        }

        const user = users.find(
          (u) => u.username === req.body.username && u.password === req.body.password
        );

        if (!user) {
          return res.render("login", { message: "Invalid user/password" });
        }

        req.session.username = req.body.username;
        req.session.name = user.Name;

        res.redirect("/users/dashboard");
      });
    });

    // ✅ Homepage
    app.get("/", (req, res) => {
      fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error while reading products.");
        }

        let products;
        try {
          products = JSON.parse(data);
        } catch (e) {
          console.error("Invalid JSON in products.json");
          return res.status(500).send("Server error in products file.");
        }

        res.render("index", { products });
      });
    });

    // ✅ Product Details
    app.get("/productDetails/:id", (req, res) => {
      fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error while reading products.");
        }

        let products;
        try {
          products = JSON.parse(data);
        } catch (e) {
          console.error("Invalid JSON in products.json");
          return res.status(500).send("Server error in products file.");
        }

        const product = products.find((p) => p.id == req.params.id);

        if (!product) return res.status(404).send("Product not found");

        res.render("productDetails", { product });
      });
    });

    // ✅ Start Server
    app.listen(5000, () => {
      console.log("🚀 Server started on http://localhost:5000");
    });
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
