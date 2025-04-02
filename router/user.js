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
router.get("/my-account", (req, res) =>
  res.render("user/index", { title: "My Account" })
);

// Edit Account Information
router.get("/my-account/edit-account", (req, res) =>
  res.render("user/pages/information", { title: "Information" })
);

// Address Routes
router.get("/my-account/address", (req, res) =>
  res.render("user/pages/address", { title: "Address" })
);
router.get("/my-account/address/billing", (req, res) =>
  res.render("user/pages/billing", { title: "My Account" })
);
router.get("/my-account/address/shipping", (req, res) =>
  res.render("user/pages/shipping", { title: "My Account" })
);

// Orders & Checkout

router.get("/my-account/order", (req, res) => {
  res.render("user/pages/order", { title: "My Account", orders });
});

router.get("/my-account/order/:id", (req, res) => {
  const order = orders.find((o) => o.id == req.params.id);
  if (!order) return res.status(404).send("Order not found");
  res.render("user/pages/orderDetails", { title: "My Account", order });
});

module.exports = router;
