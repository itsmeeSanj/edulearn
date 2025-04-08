const express = require("express");
const router = express.Router();

const sidebar = require("../sidebar.json");

const productController = require("../controller/admin/productController");
const brandController = require("../controller/admin/brandController");

// Dashboard route
router.get("/", (req, res) => {
  try {
    res.render("admin/index", {
      title: "Admin | Dashboard",
      pageTitle: "Dashboard",
      page: "dashboard",
      sidebar,
    });
  } catch (error) {
    console.error("Error rendering dashboard:", error);
    res.status(500).send("Internal Server Error");
  }
});

// product Routes
router.get("/products", productController.getProducts);
router.get("/products/add", productController.addProductPage);

router.post(
  "/products/add",
  productController.upload,
  productController.addProduct
);
router.get("/products/edit/:id", productController.editProductPage);
router.post(
  "/products/edit/:id",
  productController.upload,
  productController.updateProduct
);
router.get("/products/delete/:id", productController.deleteProduct);

// admin brands route
router.get("/brands", brandController.getBrand);
router.post("/brands", brandController.upload, brandController.addBrand);
router.get("/brands/add", (req, res) => {
  try {
    res.render("admin/index", {
      title: "Admin Management",
      pageTitle: "Add Brand",
      page: "brands/add",
      brand: null,
      sidebar,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
router.get("/brands/edit/:id", brandController.editBrandPage);
router.put("/brands/:id", brandController.upload, brandController.updateBrand);
router.post("/brands/delete/:id", brandController.deleteBrand);

// Users management route
router.get("/users", (req, res) => {
  try {
    res.render("admin/index", {
      title: "Admin | User Management",
      pageTitle: "User Management",
      page: "users/index",
      sidebar,
    });
  } catch (error) {
    console.error("Error rendering users page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Settings route
router.get("/settings", (req, res) => {
  try {
    res.render("admin/index", {
      title: "Admin | Admin Settings",
      pageTitle: "Admin Settings",
      page: "settings",
      sidebar,
    });
  } catch (error) {
    console.error("Error rendering settings page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 404 handler for admin routes
// router.use((req, res) => {
//   res.status(404).render("admin/404", {
//     title: "Admin | Page Not Found",
//     sidebar,
//   });
// });

module.exports = router;
