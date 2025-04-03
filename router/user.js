const express = require("express");
const router = express.Router();

const orders = [
  // Your order data here...
];

// Set layout for all routes in this router
router.use((req, res, next) => {
  res.locals.layout = "user/layout";
  next();
});

router.get("/", (req, res) =>
  res.render("user/index", {
    title: "My Account",
    page: "userDashboard",
  })
);

router.get("/edit-account", (req, res) =>
  res.render("user/index", {
    title: "Information",
    page: "information",
  })
);

router.get("/address", (req, res) =>
  res.render("user/index", {
    title: "Address",
    page: "address",
  })
);

router.get("/address/billing", (req, res) =>
  res.render("user/index", {
    title: "My Account",
    page: "billing",
  })
);

router.get("/address/shipping", (req, res) =>
  res.render("user/index", {
    title: "My Account",
    page: "shipping",
  })
);

router.get("/order", (req, res) => {
  res.render("user/index", {
    title: "My Account",
    orders,
    page: "order",
  });
});

router.get("/order/:id", (req, res) => {
  const order = orders.find((o) => o.id == req.params.id);
  if (!order) return res.status(404).send("Order not found");
  res.render("user/index", {
    title: "My Account",
    order,
    page: "orderDetails",
  });
});

module.exports = router;
