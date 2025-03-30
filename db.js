const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/instrument_db";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
