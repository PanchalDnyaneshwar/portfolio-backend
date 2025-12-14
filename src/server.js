const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { registerAdminOnce } = require("./controllers/adminAuthController");

dotenv.config();

// Validate critical environment variables on startup
const requiredEnvVars = ["JWT_SECRET", "DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn(
    `⚠️  Missing environment variables: ${missingVars.join(", ")}. Some features may not work properly.`
  );
}

const app = express();

// ---------------- CORS CONFIG ----------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dnyaneshwarpanchal.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Helps with OPTIONS preflight requests
app.options("*", cors());
// ---------------------------------------------

app.use(express.json());

// Auto-create admin
registerAdminOnce().catch((e) => console.error("Admin init error:", e.message));

// Health Check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Portfolio backend running 🚀" });
});

// ---------------- PUBLIC ROUTES ----------------
app.use("/api/projects", require("./routes/publicProjectRoutes"));
app.use("/api/skills", require("./routes/publicSkillRoutes"));
app.use("/api/about", require("./routes/publicAboutRoutes"));
app.use("/api/work", require("./routes/publicWorkRoutes"));
app.use("/api/blogs", require("./routes/publicBlogRoutes"));
app.use("/api/auth", require("./routes/userAuthRoutes"));

// Contact route
app.use("/api/contact", require("./routes/contactRoutes"));
// ------------------------------------------------

// ---------------- ADMIN ROUTES ------------------
app.use("/api/admin/auth", require("./routes/adminAuthRoutes"));
app.use("/api/admin/projects", require("./routes/adminProjectRoutes"));
app.use("/api/admin/skills", require("./routes/adminSkillRoutes"));
app.use("/api/admin/about", require("./routes/adminAboutRoutes"));
app.use("/api/admin/work", require("./routes/adminWorkRoutes"));
app.use("/api/admin/blogs", require("./routes/adminBlogRoutes"));
app.use("/api/admin/contacts", require("./routes/adminContactRoutes"));
// ------------------------------------------------

// Global error handler for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

// Global error handler for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Portfolio backend listening on http://localhost:${PORT}`)
);
