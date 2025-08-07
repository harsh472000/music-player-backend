
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validate");

// Helper: Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ user: { id: userId } }, JWT_SECRET, { expiresIn: "30d" });
};

// Register
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { isValid, errors } = validateRegisterInput({
      firstName,
      lastName,
      email,
      password,
    });

    if (!isValid) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail }).lean();

    if (existingUser) {
      return res.status(409).json({
        message: "Registration failed",
        errors: { email: "User with this email already exists" },
      });
    }

    const newUser = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password, // will be hashed by pre-save hook
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    const userData = {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration",
    });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { isValid, errors } = validateLoginInput({ email, password });

    if (!isValid) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Login failed",
        errors: { credentials: "Invalid email or password" },
      });
    }

    const token = generateToken(user._id);

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
