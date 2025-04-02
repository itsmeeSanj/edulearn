const express = require("express");
const router = express.Router();

// Middleware for authentication (Add proper authentication)
// const isAuthenticated = (req, res, next) => {
//   if (req.user) {
//     return next();
//   } else {
//     res.redirect("/login");
//   }
// };

// Admin Dashboard Home
router.get("/", (req, res) => {
  res.render("admin/index", { title: "Admin Dashboard" });
});

module.exports = router;
