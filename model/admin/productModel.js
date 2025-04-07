const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  prevPrice: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  description: {
    type: String,
  },
  shortdesc: {
    type: String,
  },
  brand: {
    type: String, // brand name (e.g., "Nike")
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
