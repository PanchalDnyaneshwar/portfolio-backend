const router = require("express").Router();
const jwtAuth = require("../middleware/jwtAuth");
const {
  projectValidators,
  adminListProjects,
  adminGetProject,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject
} = require("../controllers/projectAdminController");

router.use(jwtAuth);
router.get("/", adminListProjects);
router.get("/:id", adminGetProject);
router.post("/", projectValidators, adminCreateProject);
router.put("/:id", projectValidators, adminUpdateProject);
router.delete("/:id", adminDeleteProject);

module.exports = router;
