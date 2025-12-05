const pool = require("../config/db");

async function getAboutInfo() {
  const [rows] = await pool.query("SELECT * FROM about ORDER BY id ASC");
  return rows;
}

async function getAboutById(id) {
  const [rows] = await pool.query("SELECT * FROM about WHERE id = ?", [id]);
  return rows[0] || null;
}

async function createAbout({ title, description, color }) {
  const [result] = await pool.query(
    `INSERT INTO about (title, description, color)
     VALUES (?, ?, ?)`,
    [title, description, color]
  );
  return result.insertId;
}

async function updateAbout(id, { title, description, color }) {
  const [result] = await pool.query(
    `UPDATE about
     SET title = ?, description = ?, color = ?
     WHERE id = ?`,
    [title, description, color, id]
  );
  return result.affectedRows > 0;
}

async function deleteAbout(id) {
  const [result] = await pool.query("DELETE FROM about WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAboutInfo,
  getAboutById,
  createAbout,
  updateAbout,
  deleteAbout
};
