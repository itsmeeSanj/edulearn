const express = require("express");
const router = express.Router();

// cart
router.get("/cart", async (req, res) => {
  try {
    const cartItems = require("../cart-items.json"); // Fetch data from JSON
    res.render("cart", { cartItems });
  } catch (error) {
    res.status(500).send("Error Fetching: " + error.message);
  }
});

// Route for the checkout page
router.get("/checkout", (req, res) => {
  // You can load additional data like user info if necessary
  res.render("checkout");
});

// Route to handle order completion
router.post("/order-complete", (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    postalCode,
    email,
    phone,
    shippingAddress,
    shippingCity,
    shippingPostalCode,
  } = req.body;

  // You can handle the order processing here (e.g., store in database, send email confirmation)

  // Render the order complete page
  res.render("order-complete", {
    firstName,
    lastName,
    email,
    shippingAddress,
    shippingCity,
    shippingPostalCode,
  });
});

module.exports = router;
