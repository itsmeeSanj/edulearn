const express = require("express");
const router = express.Router();

// ✅ GET All Products API

const Product = require("../model/admin/instrument_crud");

router.get("/products", async (req, res) => {
  try {
    const instruments = await Product.find(); // Fetch all products from MongoDB
    res.render("admin/index", { instruments }); // Pass data to EJS
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
