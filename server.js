require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

// Import MongoDB connection function
const connectDB = require("./db");

const app = express();

// Fallback to default port if not set in .env
const PORT = process.env.DEV_PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
connectDB();

// Import and use route files
const mainRoutes = require("./router/pageRoutes");
const cartRoutes = require("./router/cartRoue");
const accountRoutes = require("./router/user");

app.use("/", mainRoutes);
app.use("/", cartRoutes);
app.use("/", accountRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
