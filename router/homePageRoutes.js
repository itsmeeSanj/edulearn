const express = require("express");
const router = express.Router();

const Brand = require("../model/admin/brandModel");
const products = require("../model/admin/productModel");
const contactController = require("../controller/admin/contactController");

// Home Route
router.get("/", async (req, res) => {
  try {
    const instruments = require("../data.json"); // Fetch data from JSON
    const brands = await Brand.find(); // or limit/filter as needed
    const productsData = await products.find();

    res.render("index", {
      title: "Home",
      instruments,
      brands,
      productsData,
    });
  } catch (error) {
    res.status(500).send("Error Fetching: " + error.message);
  }
});

// page-category
router.get("/product-category/:brandName", async (req, res) => {
  try {
    const brandName = req.params.brandName;
    const brands = await Brand.findOne({ name: brandName });

    if (!brands) return res.status(404).send("Brand not found");

    const productsData = await products.find({ brand: brandName });
    const productCount = productsData.length;

    res.render("pages/list", {
      title: "Product",
      productsData,
      brands,
      brandName: brands.name,
      brandDesc: brands.shortdesc,
      productCount,
    });
  } catch (error) {
    res.status(500).send("Error Fetching: " + error.message);
  }
});

// page-desc
router.get("/products/:id", async (req, res) => {
  try {
    const product = await products.findById(req.params.id);
    res.render("pages/details", {
      title: "Product",
      product,
    });
  } catch (error) {
    res.status(500).send("Product not found" + error.message);
  }
});

router.get("/contact", async (req, res) => {
  try {
    res.render("pages/contact", {
      title: "Contact",
    });
  } catch (error) {
    res.status(500).send("Error Fetching: " + error.message);
  }
});
router.post("/contact", contactController.submitContactForm);

// Login Page
router.get("/login", (req, res) =>
  res.render("pages/login", {
    title: "Login",
  })
);

// Register Page
router.get("/register", (req, res) =>
  res.render("pages/register", {
    title: "List",
  })
);

router.get("/about", (req, res) =>
  res.render("pages/about", {
    title: "List",
  })
);

// cart
router.get("/cart", async (req, res) => {
  try {
    const cartItems = require("../cart-items.json"); // Fetch data from JSON
    res.render("pages/cart", { cartItems });
  } catch (error) {
    res.status(500).send("Error Fetching: " + error.message);
  }
});

// Route for the checkout page
router.get("/checkout", (req, res) => {
  // You can load additional data like user info if necessary
  res.render("pages/checkout");
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
  res.render("pages/order-complete", {
    firstName,
    lastName,
    email,
    shippingAddress,
    shippingCity,
    shippingPostalCode,
  });
});

module.exports = router;
