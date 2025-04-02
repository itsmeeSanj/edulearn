const express = require("express");
const router = express.Router();

// Home Route
router.get("/", async (req, res) => {
  try {
    const instruments = require("../data.json"); // Fetch data from JSON
    res.render("index", { title: "Home", instruments });
  } catch (error) {
    res.status(500).send("Error Fetching: " + error.message);
  }
});

// Login Page
router.get("/login", (req, res) => res.render("login"));

// Register Page
router.get("/register", (req, res) => res.render("register"));

router.get("/about", (req, res) => res.render("about"));

// List Page
router.get("/list", (req, res) => res.render("list"));
router.get("/details", (req, res) =>
  res.render("details", { title: "Details" })
);

// checkout
router.get("/checkout", (req, res) => res.render("checkout"));

module.exports = router;
