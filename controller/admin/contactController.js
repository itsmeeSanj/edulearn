const contact = require("../../model/admin/contactModel");
const sidebar = require("../../sidebar.json");

const { successMessage, errorMessage } = require("../../utils/message");

// usercontact
exports.submitContactForm = async (req, res) => {
  try {
    const { fullName, email, phone, msg } = req.body;

    const newContact = new contact({
      fullName,
      email,
      phone,
      msg,
    });

    await newContact.save();
    res.render("pages/contact", {
      title: "Contact",
    });
  } catch (error) {
    res.status(500).send("Error submitting form: " + error.message);
  }
};

// for admin
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contact.find().sort({ createdAt: -1 });

    const today = new Date(); // make sure this line exists
    const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

    res.render("admin/index", {
      title: "Contact Management",
      pageTitle: "Contact Management",
      page: "contacts/index",
      sidebar,
      contacts,
      date: formattedDate,
    });
  } catch (error) {
    res.status(500).send("Error loading contacts: " + error.message);
  }
};

// delete
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting Contact with ID:", id);

    // Find the brand and retrieve the image filename
    const contacts = await contact.findById(id);
    if (!contacts) return res.status(404).send("Contact not found");

    // Delete the brand from the database
    await contact.findByIdAndDelete(id);
    res.redirect("/admin/contacts");
  } catch (error) {
    console.error("Error deleting Contact:", error);
    res.status(500).json({ error: error.message });
  }
};
