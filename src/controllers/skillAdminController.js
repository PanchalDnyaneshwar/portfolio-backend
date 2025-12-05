const { body, validationResult } = require("express-validator");
const {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill
} = require("../models/skillModel");

exports.skillValidators = [
  body("title").trim().notEmpty().withMessage("Title required"),
  body("description").trim().notEmpty().withMessage("Description required")
];

exports.adminListSkills = async (req, res) => {
  const data = await getAllSkills();
  res.json({ success: true, data });
};

exports.adminCreateSkill = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { title, description, tags = "" } = req.body;
  const tagsString = Array.isArray(tags) ? tags.join(",") : tags;

  const id = await createSkill({ title, description, tags: tagsString });
  res.status(201).json({ success: true, data: { id } });
};

exports.adminUpdateSkill = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { title, description, tags = "" } = req.body;
  const tagsString = Array.isArray(tags) ? tags.join(",") : tags;

  const ok = await updateSkill(req.params.id, {
    title,
    description,
    tags: tagsString
  });
  if (!ok)
    return res.status(404).json({ success: false, message: "Not found" });

  res.json({ success: true, message: "Updated" });
};

exports.adminDeleteSkill = async (req, res) => {
  const ok = await deleteSkill(req.params.id);
  if (!ok)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, message: "Deleted" });
};
