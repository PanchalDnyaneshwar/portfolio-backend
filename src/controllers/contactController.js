const { validationResult, body } = require("express-validator");
const { createContact } = require("../models/contactModel");
const transporter = require("../config/email");

exports.contactValidators = [
  body("name").trim().notEmpty(),
  body("email").trim().isEmail(),
  body("subject").trim().notEmpty(),
  body("message").trim().isLength({ min: 10 })
];

exports.handlePublicContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { name, email, subject, message } = req.body;

  try {
    // Store in DB
    const id = await createContact({ name, email, subject, message });

    // -------- Send Email to Admin ----------
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New message from ${name}`,
      html: `
        <h3>New message from portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    // -------- Auto-Reply to User ----------
    await transporter.sendMail({
      from: `"Dnyaneshwar Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting me!",
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>I received your message and I will reply soon.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    return res.json({
      success: true,
      message: "Message sent successfully",
      data: { id }
    });

  } catch (err) {
    console.error("Email Error:", err);
    return res.status(500).json({
      success: false,
      message: "Email sending failed"
    });
  }
};
