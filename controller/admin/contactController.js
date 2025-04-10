const contact = require("../../model/admin/contactModel");
const sidebar = require("../../sidebar.json");

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

    res.render("admin/index", {
      title: "Contact Management",
      pageTitle: "Contact Management",
      page: "contacts/index",
      sidebar,
      contacts,
    });
  } catch (error) {
    res.status(500).send("Error loading contacts: " + error.message);
  }
};
