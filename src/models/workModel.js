const pool = require("../config/db");

async function getAllWork() {
  const [rows] = await pool.query(
    "SELECT * FROM work_experience ORDER BY id DESC"
  );
  return rows;
}

async function getWorkById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM work_experience WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

async function createWork({ role, company, duration, description, color }) {
  const [result] = await pool.query(
    `INSERT INTO work_experience (role, company, duration, description, color)
     VALUES (?, ?, ?, ?, ?)`,
    [role, company, duration, description, color]
  );
  return result.insertId;
}

async function updateWork(
  id,
  { role, company, duration, description, color }
) {
  const [result] = await pool.query(
    `UPDATE work_experience
     SET role = ?, company = ?, duration = ?, description = ?, color = ?
     WHERE id = ?`,
    [role, company, duration, description, color, id]
  );
  return result.affectedRows > 0;
}

async function deleteWork(id) {
  const [result] = await pool.query(
    "DELETE FROM work_experience WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  getAllWork,
  getWorkById,
  createWork,
  updateWork,
  deleteWork
};
