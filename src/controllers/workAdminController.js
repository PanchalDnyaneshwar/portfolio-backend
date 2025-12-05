const { body, validationResult } = require("express-validator");
const {
  getAllWork,
  createWork,
  updateWork,
  deleteWork
} = require("../models/workModel");

exports.workValidators = [
  body("role").trim().notEmpty().withMessage("Role required"),
  body("company").trim().notEmpty().withMessage("Company required"),
  body("duration").trim().notEmpty().withMessage("Duration required"),
  body("description").trim().notEmpty().withMessage("Description required")
];

exports.adminListWork = async (req, res) => {
  const data = await getAllWork();
  res.json({ success: true, data });
};

exports.adminCreateWork = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { role, company, duration, description, color } = req.body;
  const id = await createWork({
    role,
    company,
    duration,
    description,
    color
  });
  res.status(201).json({ success: true, data: { id } });
};

exports.adminUpdateWork = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { role, company, duration, description, color } = req.body;
  const ok = await updateWork(req.params.id, {
    role,
    company,
    duration,
    description,
    color
  });
  if (!ok)
    return res.status(404).json({ success: false, message: "Not found" });

  res.json({ success: true, message: "Updated" });
};

exports.adminDeleteWork = async (req, res) => {
  const ok = await deleteWork(req.params.id);
  if (!ok)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, message: "Deleted" });
};
