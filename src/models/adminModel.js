const pool = require("../config/db");

async function getAdminByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM admin_users WHERE email = ?", [
    email
  ]);
  return rows[0] || null;
}

async function createAdmin({ name, email, password }) {
  const [result] = await pool.query(
    "INSERT INTO admin_users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result.insertId;
}

module.exports = { getAdminByEmail, createAdmin };
