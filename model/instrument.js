const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
  InstrumentName: String,
  InstrumentCurentPrice: Number,
  InstrumentPrevPrice: Number,
  InstrumentShortDesc: String,
  InstrumentFullDesc: String,
  InstrumentImage: String,
});

const instrument = mongoose.model("instrument", instrumentSchema);
module.exports = instrument;
