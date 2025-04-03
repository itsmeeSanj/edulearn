// Require necessary modules
var mongoose = require("mongoose");
var path = require("path");

// Require the instrument models
const insModel = require("../instrument");

module.exports = {
  // Get All Instruments
  getAllInstruments: async (req, res) => {
    try {
      const instruments = await insModel.find().sort({ name: 1 }); // Sort in ascending order
      if (!instruments) {
        return res
          .status(404)
          .render("error", { errorMessage: "Instrument not found." });
      }
      return instruments; // Return the instruments
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .render({ message: "Error retrieving instruments" });
    }
  },

  // Get Instrument By ID
  getInstrumentById: async (req, res) => {
    try {
      const instrument = await insModel.findById(req.params.id);
      if (!instrument) {
        return res
          .status(404)
          .render("error", { errorMessage: "Instrument not found." });
      }
      return instrument; // Return the instrument
    } catch (error) {
      console.error(error);
      return res.status(400).render({ message: "Error retrieving instrument" });
    }
  },

  // Get Instrument By ID
  searchItems: async (req, res) => {
    console.log("Search Instrument ID:", req.query.query);
    try {
      const searchQuery = req.query.query; // Get search term from query parameter

      if (!searchQuery) {
        return res.redirect("/admin/products"); // Redirect if no search term provided
      }

      const instruments = await insModel.find({
        InstrumentName: { $regex: searchQuery, $options: "i" }, // Case-insensitive partial match
      });

      if (instruments.length === 0) {
        return res.status(404).render("error", {
          instruments: [],
          errorMessage: "No matching instruments found.",
        });
      }

      return instruments; // Return the instruments
    } catch (error) {
      console.error("Error searching for instrument:", error);
      return res
        .status(500)
        .render("error", { errorMessage: "Error searching for instrument." });
    }
  },

  // Post request to add a instrument
  addInstrumentPost: async (req, res) => {
    try {
      console.log("Request body:", req.body);
      // Generate a random number between 1 and 9
      const randomNumber = Math.floor(Math.random() * 9) + 1;

      // Extract the required fields from the request body
      const { name, curPrice, shortDescription, fullDescription } = req.body;
      // Validate that all required fields are present
      if (!name || !curPrice || !shortDescription || !fullDescription) {
        return res
          .status(400)
          .render("error", { errorMessage: "All fields are required." });
      }
      // Create a new instrument document
      const newInstrument = new insModel({
        InstrumentName: name,
        InstrumentCurentPrice: curPrice,
        InstrumentPrevPrice: 0,
        InstrumentShortDesc: shortDescription,
        InstrumentFullDesc: fullDescription,
        InstrumentImage: "https://example.com/images/" + randomNumber + ".jpg",
      });
      console.log("Instrument body:", newInstrument);
      // Save the student to the database
      await newInstrument.save();
      // Redirect to the home page
      res.redirect("/admin/products");
    } catch (error) {
      console.error("Error adding instrument:", error);
      res
        .status(500)
        .render("error", { errorMessage: "Error adding instrument." });
    }
  },
  // Post request to edit a instrument
  editInstrumentPost: async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("ID :", req.body.id);
      // Extract the required fields from the request body
      const { name, curPrice, shortDescription, fullDescription } = req.body;
      // Validate that all required fields are present
      if (!name || !curPrice || !shortDescription || !fullDescription) {
        return res
          .status(400)
          .render("error", { errorMessage: "All fields are required." });
      }
      // Fetch instrument from the database
      const instrument = await insModel.findById(req.body.id);
      // If student is not found, return a 404 error
      if (!instrument) {
        return res
          .status(404)
          .render("error", { errorMessage: "Instrument not found." });
      }
      // Update the instrument document
      instrument.InstrumentName = name;
      instrument.InstrumentPrevPrice = instrument.InstrumentCurentPrice;
      instrument.InstrumentCurentPrice = curPrice;
      instrument.InstrumentShortDesc = shortDescription;
      instrument.InstrumentFullDesc = fullDescription;
      console.log("Instrument body:", instrument);
      // Save the updated instrument to the database
      await instrument.save();
      // Redirect to the home page
      res.redirect("/admin/products");
    } catch (error) {
      console.error("Error updating instrument:", error);
      res
        .status(500)
        .render("error", { errorMessage: "Error updating instrument." });
    }
  },

  // Get request to delete a instrument
  // deleteInstrumentGet: async (req, res) => {
  //     console.log("Delete Instrument ID:", req.params.id);
  //     try {
  //         // Fetch instrument from the database
  //         const instrument = await insModel.findById(req.params.id);
  //         // If instrument is not found, return a 404 error
  //         if (!instrument) {
  //             return res.status(404).render('error', { errorMessage: 'Instrument not found.' });
  //         }
  //         // Render the view and pass the instrument as null
  //         res.render('admin/pages/confirmDelete', { instrument });
  //     } catch (error) {
  //         console.error('Error fetching instrument:', error);
  //         res.status(500).render('error', { errorMessage: 'Error fetching instrument.' });
  //     }
  // },

  // Post request to delete a instrument
  deleteInstrumentPost: async (req, res) => {
    try {
      console.log("Delete Instrument ID:", req.params.id);
      // Find and delete the instrument from the database
      const instrument = await insModel.findOneAndDelete({
        _id: req.params.id,
      });
      // If instrument is not found, return a 404 error
      if (!instrument) {
        return res
          .status(404)
          .render("error", { errorMessage: "Instrumet not found." });
      }
      // Redirect to the home page
      res.redirect("/admin");
    } catch (error) {
      console.error("Error deleting instrument:", error);
      res
        .status(500)
        .render("error", { errorMessage: "Error deleting instrument." });
    }
  },
};
