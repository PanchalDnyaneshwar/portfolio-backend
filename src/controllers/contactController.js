const { validationResult, body } = require("express-validator");
const { createContact } = require("../models/contactModel");
const transporter = require("../config/email");

exports.contactValidators = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email required"),
  body("subject").trim().notEmpty().withMessage("Subject required"),
  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 chars")
];

exports.handlePublicContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { name, email, subject, message } = req.body;

  try {
    const id = await createContact({ name, email, subject, message });

    // send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New message from portfolio: ${subject}`,
      html: `
        <h3>New message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: { id }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
