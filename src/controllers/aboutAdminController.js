const { body, validationResult } = require("express-validator");
const {
  getAboutInfo,
  createAbout,
  updateAbout,
  deleteAbout
} = require("../models/aboutModel");

exports.aboutValidators = [
  body("title").trim().notEmpty().withMessage("Title required"),
  body("description").trim().notEmpty().withMessage("Description required")
];

exports.adminListAbout = async (req, res) => {
  const data = await getAboutInfo();
  res.json({ success: true, data });
};

exports.adminCreateAbout = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { title, description, color } = req.body;
  const id = await createAbout({ title, description, color });
  res.status(201).json({ success: true, data: { id } });
};

exports.adminUpdateAbout = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { title, description, color } = req.body;
  const ok = await updateAbout(req.params.id, { title, description, color });
  if (!ok)
    return res.status(404).json({ success: false, message: "Not found" });

  res.json({ success: true, message: "Updated" });
};

exports.adminDeleteAbout = async (req, res) => {
  const ok = await deleteAbout(req.params.id);
  if (!ok)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, message: "Deleted" });
};
