require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

// Import MongoDB connection function
const connectDB = require("./db");

const app = express();

const PORT = process.env.DEV_PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
connectDB();

// Import and use route files
const pages = require("./router/pages");
const cart = require("./router/cart");
const user = require("./router/user");
const admin = require("./router/admin");

app.use("/", pages);
app.use("/", cart);
app.use("/user", user);
app.use("/admin", admin);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
