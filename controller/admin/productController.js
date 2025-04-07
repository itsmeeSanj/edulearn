const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Brand = require("../../model/admin/productModel");
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

// Add product
exports.addProduct = async (req, res) => {
  try {
    console.log("Form Data:", req.body);
    console.log("Uploaded File:", req.file);

    const { name } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!name || !img) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBrand = new Brand({ name, img });
    await newBrand.save();

    res.redirect("/admin/brands");
  } catch (error) {
    console.error("Error adding brand:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all products
exports.getProduct = async (req, res) => {
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

// Edit Product Page
exports.editProductPage = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).send("Brand not found");

    res.render("admin/index", {
      title: "Admin Management",
      pageTitle: "Edit Brand",
      page: "brands/add",
      sidebar,
      brand: brand,
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).send("Internal Server Error");
  }
};

// update
exports.updateProduct = async (req, res) => {
  try {
    console.log("Updating Brand:", req.body);

    const { id } = req.params;
    const { name } = req.body;
    const img = req.file ? req.file.filename : req.body.oldImg;

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { name, img },
      { new: true }
    );

    if (!updatedBrand)
      return res.status(404).json({ message: "Brand not found" });

    res.redirect("/admin/brands");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating Brand:", id);

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
