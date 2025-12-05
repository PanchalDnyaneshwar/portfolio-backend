const { getAboutInfo } = require("../models/aboutModel");

exports.getPublicAbout = async (req, res) => {
  try {
    const data = await getAboutInfo();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
