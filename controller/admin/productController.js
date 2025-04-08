const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Product = require("../../model/admin/productModel");
const Brand = require("../../model/admin/brandModel"); // For listing brands in dropdown
const sidebar = require("../../sidebar.json");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Add Product
exports.addProduct = async (req, res) => {
  try {
    console.log("Form Data:", req.body);
    console.log("Uploaded File:", req.file);

    const { title, price, prevPrice, description, shortdesc, brand } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!title || !price || !prevPrice || !img || !brand) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    const newProduct = new Product({
      title,
      price,
      prevPrice,
      description,
      shortdesc,
      brand,
      img,
    });

    await newProduct.save();
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.render("admin/index", {
      title: "Product Management",
      pageTitle: "All Products",
      page: "products/index",
      sidebar,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

// Show Add Product Page
exports.addProductPage = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.render("admin/index", {
      title: "Add Product",
      pageTitle: "Add New Product",
      page: "products/add",
      sidebar,
      brands,
      product: null,
    });
  } catch (error) {
    res.status(500).send("Error loading form");
  }
};

// Edit Product Page
exports.editProductPage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const brands = await Brand.find();

    if (!product) return res.status(404).send("Product not found");

    res.render("admin/index", {
      title: "Edit Product",
      pageTitle: "Edit Product",
      page: "products/add",
      sidebar,
      product,
      brands,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, prevPrice, description, shortdesc, brand } = req.body;
    const img = req.file ? req.file.filename : req.body.oldImg;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, price, prevPrice, description, shortdesc, brand, img },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.redirect("/admin/products");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).send("Product not found");

    // Delete image from server
    if (product.img) {
      const imagePath = path.join(
        __dirname,
        "../../public/uploads",
        product.img
      );
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image file:", err);
      });
    }

    await Product.findByIdAndDelete(id);
    res.redirect("/admin/products");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export multer middleware
exports.upload = upload.single("img");
