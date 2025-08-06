const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");
const bcrypt = require("bcryptjs");

// Register user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Basic validation for empty fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  console.log("Registering user:", { firstName, lastName, email });

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET, {
      expiresIn: "30d",
    });

    // Return success message along with token and user details
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation for empty fields
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET, {
      expiresIn: "30d",
    });

    // Return success message along with token and user details
    res.json({
      message: "Login successful",
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
