const nodemailer = require("nodemailer");
require("dotenv").config();

// Validate email configuration
const requiredEmailVars = ["EMAIL_HOST", "EMAIL_USER", "EMAIL_PASS", "ADMIN_EMAIL"];
const missingEmailVars = requiredEmailVars.filter((varName) => !process.env[varName]);

if (missingEmailVars.length > 0) {
  console.warn(
    `⚠️  Missing email environment variables: ${missingEmailVars.join(", ")}. Email functionality may not work.`
  );
}

// Determine secure connection based on port
const emailPort = Number(process.env.EMAIL_PORT) || 587;
const isSecure = emailPort === 465;

// Create transporter with improved configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: emailPort,
  secure: isSecure, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // Additional options for better reliability
  tls: {
    // Do not fail on invalid certs (useful for self-signed certificates)
    rejectUnauthorized: false
  },
  // Connection pool options
  pool: true,
  maxConnections: 1,
  maxMessages: 5
});

// Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error.message);
    console.warn("⚠️  Email functionality may not work. Please check your SMTP settings.");
  } else {
    console.log("✅ Email service configured successfully");
  }
});

module.exports = transporter;
