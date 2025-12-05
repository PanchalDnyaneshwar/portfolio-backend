const { getAllContacts, deleteContact } = require("../models/contactModel");

exports.adminListContacts = async (req, res) => {
  const data = await getAllContacts();
  res.json({ success: true, data });
};

exports.adminDeleteContact = async (req, res) => {
  const ok = await deleteContact(req.params.id);
  if (!ok)
    return res.status(404).json({ success: false, message: "Not found" });

  res.json({ success: true, message: "Deleted" });
};
