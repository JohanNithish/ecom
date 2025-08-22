const UserModel = require('../models/registerModels');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      address,
      country,
      state,
      city,
      postCode
    } = req.body;

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({$or: [{ email }, { phoneNumber }]});
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Mobile Number already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user data
    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
      country,
      state,
      city,
      postCode,
      createdAt: new Date(),
      modifiedAt: new Date()
    };

    // Save user
    const newUser = await UserModel.create(userData);

    res.json({
      success: true,
      message: "Registration successful",
      data: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
};

exports.loginUser = async (req, res) => {
  const { emailOrMobile, password } = req.body;

  try {
    const user = await UserModel.findOne({
      $or: [{ email: emailOrMobile }, { phoneNumber: emailOrMobile }],
    });

    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    // 🔹 Generate tokens with role "user"
    const accessToken = jwt.sign(
      { id: user._id, username: user.firstName, email: user.email, role: "user" },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, username: user.firstName, email: user.email, role: "user" },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d" }
    );

    // Store refresh token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login successful",
      accessToken,
    });
  } catch (err) {
    console.error("User login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    // 🔹 Ensure it's a user refresh token
    if (decoded.role !== "user") {
      return res.status(403).json({ message: "Invalid role for refresh token" });
    }

    const accessToken = jwt.sign(
      { id: decoded.id, username: decoded.username, email: decoded.email, role: "user" },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
    );

    res.json({ accessToken });
  });
};


exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    res.json({
      success: true,
      message: "Get Success",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Get Failed",
      error: error.message,
    });
  }
};


// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find(); // fetch all users
    res.json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
