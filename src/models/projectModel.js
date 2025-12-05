const pool = require("../config/db");

// Public
async function getAllProjects() {
  const [rows] = await pool.query("SELECT * FROM projects ORDER BY id DESC");
  return rows;
}

// Admin
async function getProjectById(id) {
  const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
  return rows[0] || null;
}

async function createProject({ title, description, image, tech, demo, code }) {
  const [result] = await pool.query(
    `INSERT INTO projects (title, description, image, tech, demo, code)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, image, tech, demo, code]
  );
  return result.insertId;
}

async function updateProject(id, { title, description, image, tech, demo, code }) {
  const [result] = await pool.query(
    `UPDATE projects
     SET title = ?, description = ?, image = ?, tech = ?, demo = ?, code = ?
     WHERE id = ?`,
    [title, description, image, tech, demo, code, id]
  );
  return result.affectedRows > 0;
}

async function deleteProject(id) {
  const [result] = await pool.query("DELETE FROM projects WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
