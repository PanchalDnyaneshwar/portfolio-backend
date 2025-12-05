const { getAllWork } = require("../models/workModel");

exports.getPublicWork = async (req, res) => {
  try {
    const data = await getAllWork();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
