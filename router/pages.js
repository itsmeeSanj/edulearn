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
router.get("/login", (req, res) =>
  res.render("login", {
    title: "Login",
  })
);

// Register Page
router.get("/register", (req, res) =>
  res.render("register", {
    title: "List",
  })
);

router.get("/about", (req, res) =>
  res.render("about", {
    title: "List",
  })
);

// List Page
router.get("/list", (req, res) =>
  res.render("pages/list", {
    title: "List",
  })
);

router.get("/details", (req, res) =>
  res.render("pages/details", { title: "Details" })
);

module.exports = router;
