const pool = require("../config/db");

async function createContact({ name, email, subject, message }) {
  const [result] = await pool.query(
    `INSERT INTO contacts (name, email, subject, message)
     VALUES (?, ?, ?, ?)`,
    [name, email, subject, message]
  );
  return result.insertId;
}

async function getAllContacts() {
  const [rows] = await pool.query(
    "SELECT * FROM contacts ORDER BY created_at DESC"
  );
  return rows;
}

async function deleteContact(id) {
  const [result] = await pool.query("DELETE FROM contacts WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createContact,
  getAllContacts,
  deleteContact
};
