const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(
    `⚠️  Missing required database environment variables: ${missingVars.join(", ")}`
  );
}

const isAiven = process.env.DB_SSL === "true";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: isAiven
    ? { rejectUnauthorized: false } 
    : undefined
});

// Test connection on startup
pool.getConnection()
  .then((connection) => {
    console.log("✅ Database connection established");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

module.exports = pool;
