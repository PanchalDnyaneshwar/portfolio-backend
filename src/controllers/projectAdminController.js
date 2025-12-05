const { body, validationResult } = require("express-validator");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../models/projectModel");

exports.projectValidators = [
  body("title").trim().notEmpty().withMessage("Title required"),
  body("description").trim().notEmpty().withMessage("Description required")
];

exports.adminListProjects = async (req, res) => {
  const data = await getAllProjects();
  res.json({ success: true, data });
};

exports.adminGetProject = async (req, res) => {
  const project = await getProjectById(req.params.id);
  if (!project)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: project });
};

exports.adminCreateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { title, description, image, tech = "", demo, code } = req.body;
  const techString = Array.isArray(tech) ? tech.join(",") : tech;

  const id = await createProject({
    title,
    description,
    image,
    tech: techString,
    demo,
    code
  });

  res.status(201).json({ success: true, data: { id } });
};

exports.adminUpdateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  const { title, description, image, tech = "", demo, code } = req.body;
  const techString = Array.isArray(tech) ? tech.join(",") : tech;

  const ok = await updateProject(req.params.id, {
    title,
    description,
    image,
    tech: techString,
    demo,
    code
  });
  if (!ok)
    return res.status(404).json({ success: false, message: "Not found" });

  res.json({ success: true, message: "Updated" });
};

exports.adminDeleteProject = async (req, res) => {
  const ok = await deleteProject(req.params.id);
  if (!ok)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, message: "Deleted" });
};
