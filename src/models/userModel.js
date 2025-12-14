const pool = require("../config/db");

// Get user by email
exports.getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

// Get user by ID
exports.getUserById = async (id) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Create new user
exports.createUser = async ({ name, email, password }) => {
  try {
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
      [name, email, password]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user
exports.updateUser = async (id, updateData) => {
  try {
    const fields = [];
    const values = [];

    if (updateData.name) {
      fields.push("name = ?");
      values.push(updateData.name);
    }

    if (updateData.email) {
      fields.push("email = ?");
      values.push(updateData.email);
    }

    if (updateData.password) {
      fields.push("password = ?");
      values.push(updateData.password);
    }

    if (fields.length === 0) {
      return false;
    }

    fields.push("updated_at = NOW()");
    values.push(id);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    await pool.execute(query, values);
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete user
exports.deleteUser = async (id) => {
  try {
    await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (params = {}) => {
  try {
    const { page = 1, limit = 50, search = "" } = params;
    const offset = (page - 1) * limit;

    let query = `
      SELECT id, name, email, created_at, updated_at
      FROM users
      WHERE 1=1
    `;
    const values = [];

    if (search) {
      query += " AND (name LIKE ? OR email LIKE ?)";
      const searchPattern = `%${search}%`;
      values.push(searchPattern, searchPattern);
    }

    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    values.push(parseInt(limit), offset);

    const [rows] = await pool.execute(query, values);

    // Get total count
    let countQuery = "SELECT COUNT(*) as total FROM users WHERE 1=1";
    const countValues = [];

    if (search) {
      countQuery += " AND (name LIKE ? OR email LIKE ?)";
      const searchPattern = `%${search}%`;
      countValues.push(searchPattern, searchPattern);
    }

    const [countRows] = await pool.execute(countQuery, countValues);
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    return {
      users: rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

