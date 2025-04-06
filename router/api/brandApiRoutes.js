const express = require("express");
const router = express.Router();

const {
  addBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../../controller/admin/brandController");

// brands
router.post("/brands", addBrand);
router.get("/brands", getBrand);
router.put("/brands/:id", updateBrand);
router.delete("/brands/:id", deleteBrand);

module.exports = router;
