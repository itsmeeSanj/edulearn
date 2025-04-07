require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

// Import MongoDB connection function
const connectDB = require("./db");

const app = express();
const PORT = process.env.DEV_PORT;

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

// Connect to MongoDB
connectDB();

// Import and use route files
const homePage = require("./router/homePageRoutes");
const userPage = require("./router/userRoutes");
const adminPage = require("./router/adminRoutes");

app.use("/", homePage);
app.use("/user", userPage);
app.use("/admin", adminPage);

// Import and use API Route Files
// const brandApiRoutes = require("./router/api/brandApiRoutes");
// app.use("/api/brands", brandApiRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
