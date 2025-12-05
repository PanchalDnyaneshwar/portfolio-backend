const pool = require("../config/db");

async function getAllSkills() {
  const [rows] = await pool.query("SELECT * FROM skills ORDER BY id DESC");
  return rows;
}

async function getSkillById(id) {
  const [rows] = await pool.query("SELECT * FROM skills WHERE id = ?", [id]);
  return rows[0] || null;
}

async function createSkill({ title, description, tags }) {
  const [result] = await pool.query(
    `INSERT INTO skills (title, description, tags)
     VALUES (?, ?, ?)`,
    [title, description, tags]
  );
  return result.insertId;
}

async function updateSkill(id, { title, description, tags }) {
  const [result] = await pool.query(
    `UPDATE skills
     SET title = ?, description = ?, tags = ?
     WHERE id = ?`,
    [title, description, tags, id]
  );
  return result.affectedRows > 0;
}

async function deleteSkill(id) {
  const [result] = await pool.query("DELETE FROM skills WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};
