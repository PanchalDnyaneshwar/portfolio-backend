const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { registerAdminOnce } = require("./controllers/adminAuthController");

dotenv.config();

const app = express();

// ---------------- CORS CONFIG ----------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dnyaneshwarpanchal.netlify.app/"
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

// ⭐ FIXED CONTACT ROUTE — removed .js extension
app.use("/api/contact", require("./routes/contactRoutes.js"));
// ------------------------------------------------

// ---------------- ADMIN ROUTES ------------------
app.use("/api/admin/auth", require("./routes/adminAuthRoutes"));
app.use("/api/admin/projects", require("./routes/adminProjectRoutes"));
app.use("/api/admin/skills", require("./routes/adminSkillRoutes"));
app.use("/api/admin/about", require("./routes/adminAboutRoutes"));
app.use("/api/admin/work", require("./routes/adminWorkRoutes"));
app.use("/api/admin/contacts", require("./routes/adminContactRoutes"));
// ------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Portfolio backend listening on http://localhost:${PORT}`)
);
