const bcrypt = require("bcryptjs");
const User = require("../../model/user/authModel");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const existingUser = await User.findOne({ email });
    console.log("Existing User:", existingUser);
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType: "user",
    });

    await newUser.save();
    res.redirect("/login"); // or wherever your login page is
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send("Invalid password");

    // Redirect based on userType
    if (user.userType === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/user");
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
