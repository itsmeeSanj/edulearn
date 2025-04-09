const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Brand = require("../../model/admin/brandModel");
const sidebar = require("../../sidebar.json");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Add brand
exports.addBrand = async (req, res) => {
  try {
    const { name, shortdesc } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!name || !img || !shortdesc) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if brand already exists
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand name already exists" });
    }

    const newBrand = new Brand({ name, img, shortdesc });
    await newBrand.save();

    res.redirect("/admin/brands");
  } catch (error) {
    if (error.code === 11000) {
      // 11000 = duplicate key error (unique constraint violation)
      return res.status(400).json({ message: "Brand name already exists" });
    }
    console.error("Error adding brand:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all brands
exports.getBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    console.log("Brands fetched:", brands); // Debugging output

    // res.status(200).json(brands);
    res.render("admin/index", {
      title: "Brand Management",
      pageTitle: "Brand Management",
      page: "brands/index",
      sidebar,
      brands,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: error.message });
  }
};

// Edit Brand Page
exports.editBrandPage = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).send("Brand not found");

    res.render("admin/index", {
      title: "Admin Management",
      pageTitle: "Edit Brand",
      page: "brands/add",
      sidebar,
      brand,
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).send("Internal Server Error");
  }
};

// update
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, shortdesc } = req.body;
    const img = req.file ? req.file.filename : req.body.oldImg;

    // Check if brand with the new name already exists (excluding the current brand)
    const existingBrand = await Brand.findOne({ name, _id: { $ne: id } });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand name already exists" });
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { name, img, shortdesc },
      { new: true }
    );

    if (!updatedBrand)
      return res.status(404).json({ message: "Brand not found" });

    res.redirect("/admin/brands");
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Brand
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting Brand with ID:", id);

    // Find the brand and retrieve the image filename
    const brand = await Brand.findById(id);
    if (!brand) return res.status(404).send("Brand not found");

    // If an image exists, delete it from the server
    if (brand.img) {
      const imagePath = path.join(__dirname, "../../public/uploads", brand.img);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image file:", err);
      });
    }

    // Delete the brand from the database
    await Brand.findByIdAndDelete(id);
    res.redirect("/admin/brands");
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export multer middleware
exports.upload = upload.single("img");
