const express = require("express");
const router = express.Router();

// Load sidebar.json and product.json directly
const sidebar = require("../sidebar.json");
//const product = require("../product.json");

// Middleware for CRUD functions
const instrumentCRUD = require("../model/admin/instrument_crud");

const routes = {
  "/": { page: "dashboard", pageTitle: "Dashboard" },
  "/products": { page: "products/index", pageTitle: "Products Management" },
  "/products/add": { page: "products/add", pageTitle: "Add Instrument" },
  "/products/edit/:id": { page: "products/add", pageTitle: "Edit Instrument" },
  "/products/delete/:id": { page: null, pageTitle: "Delete Instrument" },
  "/products/search": {
    page: "products/index",
    pageTitle: "Products Management",
  },
  "/users": { page: "users/index", pageTitle: "User Management" },
  "/settings": { page: "settings", pageTitle: "Admin Settings" },
};

// Handle routes dynamically
Object.entries(routes).forEach(([path, { page, pageTitle }]) => {
  router.get(path, async (req, res) => {
    try {
      let instruments;
      if (path === "/products" || path === "/products/search") {
        instruments = await instrumentCRUD.getAllInstruments(req, res);
      }

      if (path.startsWith("/products/edit/")) {
        const instrument = await instrumentCRUD.getInstrumentById(req, res);
        res.render("admin/index", {
          title: `Admin | ${pageTitle}`,
          pageTitle,
          page,
          sidebar,
          id: req.params.id,
          instrument,
          actionURL: `/admin/products/edit/${req.params.id}`,
        });
        return;
      }

      res.render("admin/index", {
        title: `Admin | ${pageTitle}`,
        pageTitle,
        page,
        sidebar,
        instruments: instruments || null,
        id: path === "/products/add" ? null : undefined,
        instrument: path === "/products/add" ? null : undefined,
        actionURL: path === "/products/add" ? "/admin/products/add" : undefined,
      });
    } catch (error) {
      console.error("Error rendering page:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post(path, async (req, res) => {
    try {
      if (path === "/products/add") {
        await instrumentCRUD.addInstrumentPost(req, res);
      } else if (path.startsWith("/products/edit/")) {
        await instrumentCRUD.editInstrumentPost(req, res);
      } else if (path.startsWith("/products/delete/")) {
        await instrumentCRUD.deleteInstrumentPost(req, res);
      }
    } catch (error) {
      console.error("Error handling POST request:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

module.exports = router;
