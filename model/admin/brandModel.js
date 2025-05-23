const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter brand name"],
    unique: true,
    trim: true,
  },

  img: {
    type: String,
    required: true,
  },

  shortdesc: {
    type: String,
  },
});

module.exports = mongoose.model("Brand", brandSchema);
