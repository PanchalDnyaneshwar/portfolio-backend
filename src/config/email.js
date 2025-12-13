const nodemailer = require("nodemailer");
require("dotenv").config();

// Validate email configuration
const requiredEmailVars = ["EMAIL_HOST", "EMAIL_USER", "EMAIL_PASS"];
const missingEmailVars = requiredEmailVars.filter((varName) => !process.env[varName]);

if (missingEmailVars.length > 0) {
  console.warn(
    `⚠️  Missing email environment variables: ${missingEmailVars.join(", ")}. Email functionality may not work.`
  );
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,        
  port: Number(process.env.EMAIL_PORT) || 587, 
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS       
  }
});

module.exports = transporter;
