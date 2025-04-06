const multer = require("multer");
const Brand = require("../../model/admin/brandModel");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Add brand
exports.addBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!name || !img) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBrand = new Brand({ name, img });
    await newBrand.save();

    res.redirect("/admin/brands");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get brands
exports.getBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
    res.render("admin/index", {
      title: "Admin Management",
      pageTitle: "Brand Management",
      page: "brands/index",
      brands,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
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

// Delete a brand
// Delete brand
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    await Brand.findByIdAndDelete(id);
    res.redirect("/admin/brands");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
