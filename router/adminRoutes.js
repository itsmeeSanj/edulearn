const express = require("express");
const router = express.Router();

const sidebar = require("../sidebar.json");

// Middleware for CRUD functions
const instrumentCRUD = require("../model/admin/instrument_crud");

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

// Products list route
router.get("/products", async (req, res) => {
  try {
    // const instruments = await instrumentCRUD.searchItems(req, res);
    // console.log("Instruments data:", instruments); // Debug log

    res.render("admin/index", {
      title: "Admin | Products Management",
      pageTitle: "Products Management",
      page: "products/index",
      sidebar,
      // instruments,
    });
  } catch (error) {
    console.error("Error rendering products list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/products/search", async (req, res) => {
  try {
    const instruments = await instrumentCRUD.searchItems(req, res);
    res.render("admin/index", {
      title: "Admin | Products Management",
      pageTitle: "Products Management",
      page: "products/index",
      sidebar,
      instruments,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/products/add", (req, res) => {
  try {
    res.render("admin/index", {
      title: "Admin | Add Instrument",
      pageTitle: "Add Instrument",
      page: "products/add",
      sidebar,
      actionURL: "/admin/products/add",
    });
  } catch (error) {
    console.error("Error rendering add product page:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/products/add", async (req, res) => {
  try {
    await instrumentCRUD.addInstrumentPost(req);
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error adding instrument:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/products/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Editing instrument ID:", id); // Debug log

    const instrument = await instrumentCRUD.getInstrumentById(id, res);
    console.log("Instrument data:", instrument); // Debug log

    res.render("admin/index", {
      title: "Admin | Edit Instrument",
      pageTitle: "Edit Instrument",
      page: "products/add",
      sidebar,
      instrument,
      id: id,
      actionURL: `/admin/products/edit/${id}`,
    });
  } catch (error) {
    console.error(
      "Error rendering edit product page:",
      error,
      "for ID:",
      req.params.id
    );
    res.status(500).send("Internal Server Error");
  }
});

router.post("/products/edit/:id", async (req, res) => {
  try {
    await instrumentCRUD.editInstrumentPost(req.params.id, req.body);
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error editing instrument:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/products/delete/:id", async (req, res) => {
  try {
    await instrumentCRUD.deleteInstrumentPost(req.params.id);
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error deleting instrument:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Users management route
router.get("/brands", (req, res) => {
  try {
    res.render("admin/index", {
      title: "Admin Management",
      pageTitle: "Brand Management",
      page: "brands/index",
      sidebar,
    });
  } catch (error) {
    console.error("Error rendering users page:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/brands/add", (req, res) => {
  try {
    res.render("admin/index", {
      title: "Admin Management",
      pageTitle: "Brand Management",
      page: "brands/add",
      sidebar,
    });
  } catch (error) {
    console.error("Error rendering users page:", error);
    res.status(500).send("Internal Server Error");
  }
});

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
router.use((req, res) => {
  res.status(404).render("admin/404", {
    title: "Admin | Page Not Found",
    sidebar,
  });
});

module.exports = router;
