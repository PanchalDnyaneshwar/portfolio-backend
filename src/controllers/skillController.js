const { getAllSkills } = require("../models/skillModel");

exports.getPublicSkills = async (req, res) => {
  try {
    const rows = await getAllSkills();
    const data = rows.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      tags: s.tags ? s.tags.split(",").map((t) => t.trim()) : []
    }));

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
