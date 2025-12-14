const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set in environment variables");
    return res.status(500).json({ success: false, message: "Server configuration error" });
  }

  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token is for user (not admin)
    if (decoded.type !== "user") {
      return res.status(403).json({ success: false, message: "Invalid token type" });
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

