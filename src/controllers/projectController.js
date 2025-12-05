const { getAllProjects } = require("../models/projectModel");

exports.getPublicProjects = async (req, res) => {
  try {
    const rows = await getAllProjects();
    const data = rows.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      tech: p.tech ? p.tech.split(",").map((t) => t.trim()) : [],
      demo: p.demo,
      code: p.code
    }));

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
