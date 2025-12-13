const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getAdminByEmail, createAdmin } = require("../models/adminModel");

// Create admin once on server start
exports.registerAdminOnce = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("⚠ ADMIN_EMAIL or ADMIN_PASSWORD missing from .env");
    return;
  }

  const exists = await getAdminByEmail(email);
  if (exists) {
    console.log("✅ Admin already exists");
    return;
  }

  // Hash the admin password before storing
  const hashed = await bcrypt.hash(password, 10);

  await createAdmin({
    name: "Portfolio Admin",
    email,
    password: hashed
  });

  console.log("✅ Admin auto-created:", email);
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await getAdminByEmail(email);

  if (!admin) {
    return res
      .status(400)
      .json({ success: false, message: "You are NOT Admin 😼" });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return res
      .status(400)
      .json({ success: false, message: "Wrong password 😾" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ 
      success: false, 
      message: "Server configuration error" 
    });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "24h" }
  );

  res.json({
    success: true,
    message: "Welcome Admin 🙌",
    token
  });
};
