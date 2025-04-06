const Brand = require("../../model/admin/brandModel");

exports.addBrand = async (req, res) => {
  try {
    const { name, img } = req.body;
    const newBrand = new Brand({ name, img });
    await newBrand.save();
    res.status(201).json({
      message: "Brand Created Successfully",
      newBrand,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img } = req.body;

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { name, img },
      { new: true, runValidators: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      message: "Brand Updated Successfully",
      brand: updatedBrand,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand Deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
