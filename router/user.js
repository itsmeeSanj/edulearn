const express = require("express");
const router = express.Router();

const orders = [
  {
    id: 75766,
    date: "April 2, 2025",
    status: "On hold",
    total: "Rs 51,998.0",
    payment: "Direct bank transfer",
    items: [
      {
        product: "Rode NT-USB Mini USB Condenser Microphone",
        quantity: 2,
        price: "Rs 51,998.0",
      },
    ],
    customer: {
      name: "Sanjay Rawal",
      address: "21 Reiber Cres, NORTH YORK",
      region: "Bagmati",
      phone: "9862654545",
    },
  },
  {
    id: 75763,
    date: "April 2, 2025",
    status: "On hold",
    total: "Rs 51,998.0",
    payment: "Direct bank transfer",
    items: [
      { product: "Blue Yeti Microphone", quantity: 1, price: "Rs 25,999.0" },
      { product: "Boom Arm Stand", quantity: 1, price: "Rs 25,999.0" },
    ],
    customer: {
      name: "John Doe",
      address: "123 King St, TORONTO",
      region: "Ontario",
      phone: "9876543210",
    },
  },
];

// User Account Dashboard

// router.get("/", (req, res) =>
//   res.render("user/index", { title: "My Account" })
// );

// router.get("/edit-account", (req, res) =>
//   res.render("user/pages/information", { title: "Information" })
// );

// router.get("/address", (req, res) =>
//   res.render("user/pages/address", { title: "Address" })
// );
// router.get("/address/billing", (req, res) =>
//   res.render("user/pages/billing", { title: "My Account" })
// );
// router.get("/address/shipping", (req, res) =>
//   res.render("user/pages/shipping", { title: "My Account" })
// );

const routes = {
  "/": {
    page: "userDashboard",
    pageTitle: "My Account",
  },

  "/edit-account": {
    page: "information",
    pageTitle: "My Account",
  },

  "/address": {
    page: "address",
    pageTitle: "My Account",
  },

  "/address/billing": {
    page: "billing",
    pageTitle: "My Account",
  },

  "/address/shipping": {
    page: "billing",
    pageTitle: "My Account",
  },
  "/order": {
    page: "order",
    pageTitle: "My Account",
  },
};

// Orders & Checkout

// router.get("/order", (req, res) => {
//   res.render("user/pages/order", { title: "My Account", orders });
// });

// router.get("/order/:id", (req, res) => {
//   const order = orders.find((o) => o.id == req.params.id);
//   if (!order) return res.status(404).send("Order not found");
//   res.render("user/pages/orderDetails", { title: "My Account", order });
// });

// Handle routes dynamically
Object.entries(routes).forEach(([path, { page, pageTitle }]) => {
  router.get(path, async (req, res) => {
    try {
      // When the path is "/products", send product data

      res.render("user/index", {
        title: `Admin | ${pageTitle}`, // Browser window title
        pageTitle, // Page heading
        page, // Page content
        sidebar, // Sidebar data from sidebar.json
      });
    } catch (error) {
      console.error("Error rendering page:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

// Order details route
router.get("/order/:id", (req, res) => {
  const order = orders.find((o) => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json({ message: "Order Details", order });
});

module.exports = router;
