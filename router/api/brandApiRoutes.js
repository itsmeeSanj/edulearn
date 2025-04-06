const express = require("express");
const router = express.Router();
const {
  addBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  upload,
} = require("../../controller/admin/brandController");

router.post("/brands", upload, addBrand);
router.get("/brands", getBrand);
router.put("/brands/:id", upload, updateBrand);
router.delete("/brands/:id", deleteBrand);

module.exports = router;
