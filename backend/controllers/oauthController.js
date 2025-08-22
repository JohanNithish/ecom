const { OAuth2Client } = require("google-auth-library");
const UserModel = require("../models/registerModels");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.oauthLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    // ✅ Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    // ✅ Check if user exists
    let user = await UserModel.findOne({ email });

    if (!user) {
      // Create new user without password
      user = await UserModel.create({
        firstName: given_name,
        lastName: family_name,
        email,
        phoneNumber: null,
        password: null, // no password since OAuth
        createdAt: new Date(),
        modifiedAt: new Date(),
      });
    }

    // ✅ Generate tokens
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

    // Save refreshToken in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Google login successful",
      accessToken,
    });

  } catch (err) {
    console.error("OAuth login error:", err);
    res.status(500).json({ message: "OAuth login failed" });
  }
};
