const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { registerAdminOnce } = require("./controllers/adminAuthController");
dotenv.config();

const app = express();
app.use(cors({
  origin: [process.env.VITE_FRONTEND_URL , "https://dnyaneshwarpanchal.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));

app.use(express.json());

// Auto-create single admin on start
registerAdminOnce().catch((e) => console.error("Admin init error:", e.message));

// Health
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Portfolio backend running 🚀" });
});

// Public APIs (for frontend)
app.use("/api/projects", require("./routes/publicProjectRoutes"));
app.use("/api/skills", require("./routes/publicSkillRoutes"));
app.use("/api/about", require("./routes/publicAboutRoutes"));
app.use("/api/work", require("./routes/publicWorkRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Admin auth + admin CRUD
app.use("/api/admin/auth", require("./routes/adminAuthRoutes"));
app.use("/api/admin/projects", require("./routes/adminProjectRoutes"));
app.use("/api/admin/skills", require("./routes/adminSkillRoutes"));
app.use("/api/admin/about", require("./routes/adminAboutRoutes"));
app.use("/api/admin/work", require("./routes/adminWorkRoutes"));
app.use("/api/admin/contacts", require("./routes/adminContactRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Portfolio backend listening on http://localhost:${PORT}`)
);
