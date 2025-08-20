const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminloginModels");

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required!" });
  }

  try {
    // Check if admin exists
    const admin = await AdminModel.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Wrong Username" });
    }

    // Compare password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    // Generate access & refresh tokens
    const accessToken = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: "admin",   // 🔹 distinguish admin
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
    );

    const refreshToken = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: "admin",   // 🔹 include role in refresh as well
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d" }
    );

    // Store refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use HTTPS in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // 🔹 Ensure only admin refresh works here
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Invalid role for refresh token" });
    }

    const accessToken = jwt.sign(
      {
        id: decoded.id,
        username: decoded.username,
        role: "admin",
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
    );

    res.json({ accessToken });
  });
};
