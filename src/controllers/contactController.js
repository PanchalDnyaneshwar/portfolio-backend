const { validationResult, body } = require("express-validator");
const { createContact } = require("../models/contactModel");
const transporter = require("../config/email");
const {
  getAdminNotificationTemplate,
  getAutoReplyTemplate
} = require("../templates/emailTemplates");

exports.contactValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Subject must be between 3 and 200 characters"),
  body("message")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters")
];

exports.handlePublicContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    });
  }

  const { name, email, subject, message } = req.body;

  try {
    // Store in database
    const id = await createContact({ name, email, subject, message });

    // Get admin name from environment or use default
    const adminName = process.env.ADMIN_NAME || "Dnyaneshwar";
    const adminEmail = process.env.ADMIN_EMAIL;
    const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;

    // Check if email is configured
    if (!adminEmail || !emailFrom) {
      console.warn("⚠️  Email not configured. Message saved to database but emails not sent.");
      return res.json({
        success: true,
        message: "Message received successfully. We'll get back to you soon!",
        data: { id }
      });
    }

    // Send professional email to admin
    try {
      await transporter.sendMail({
        from: `"${adminName} Portfolio" <${emailFrom}>`,
        to: adminEmail,
        replyTo: email, // Allow admin to reply directly to user
        subject: `New Contact Form Submission: ${subject}`,
        html: getAdminNotificationTemplate({
          name,
          email,
          subject,
          message,
          submissionDate: new Date()
        }),
        // Plain text fallback
        text: `New Contact Form Submission\n\nFrom: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`
      });
    } catch (emailError) {
      console.error("❌ Failed to send admin notification email:", emailError.message);
      // Continue even if email fails - message is saved in DB
    }

    // Send professional auto-reply to user
    try {
      await transporter.sendMail({
        from: `"${adminName}" <${emailFrom}>`,
        to: email,
        subject: `Re: ${subject} - Thank you for contacting me!`,
        html: getAutoReplyTemplate({
          name,
          subject,
          message,
          adminName
        }),
        // Plain text fallback
        text: `Thank you, ${name}!\n\nI've received your message and truly appreciate you taking the time to reach out. I'll review your message and get back to you as soon as possible, typically within 24-48 hours.\n\nYour Message:\nSubject: ${subject}\n\n${message}\n\nBest regards,\n${adminName}`
      });
    } catch (emailError) {
      console.error("❌ Failed to send auto-reply email:", emailError.message);
      // Continue even if auto-reply fails - message is saved in DB
    }

    return res.json({
      success: true,
      message: "Thank you for your message! I've received it and will get back to you soon.",
      data: { id }
    });

  } catch (err) {
    console.error("❌ Contact Error:", err);
    
    // Handle specific error types
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "A message with this information already exists. Please try again."
      });
    }

    if (err.message && err.message.includes("database")) {
      return res.status(500).json({
        success: false,
        message: "Unable to save your message. Please try again later."
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later."
    });
  }
};
