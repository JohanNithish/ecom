const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

      const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // Example: { id, username, role }

    // Only log decoded data in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      console.log("Decoded JWT:", decoded);
    }

    next();
  });
};
