require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

// Import MongoDB connection function
const connectDB = require("./db");

const app = express();

// Fallback to default port if not set in .env
const PORT = process.env.DEV_PORT || 3000; // Default to 3000 if not set in .env

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
connectDB();

// Routes
app.get("/", async function (req, res) {
  try {
    // Fetch data from MongoDB (if using MongoDB)
    // const instruments = await Instrument.find();

    // If using static JSON file (you can also read it from a local file)
    const instruments = require("./data.json");
    res.render("index", { instruments });
  } catch (error) {
    res.status(500).send("Error Fetching: " + error.message);
  }
});

app.get("/login", async function (req, res) {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).send("Error Fetching: " + error.message);
  }
});

app.get("/register", async function (req, res) {
  try {
    res.render("register");
  } catch (error) {
    res.status(500).send("Error Fetching: " + error.message);
  }
});

// Server
app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});
