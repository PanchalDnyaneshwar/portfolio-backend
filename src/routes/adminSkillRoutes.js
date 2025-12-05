const router = require("express").Router();
const jwtAuth = require("../middleware/jwtAuth");
const {
  skillValidators,
  adminListSkills,
  adminCreateSkill,
  adminUpdateSkill,
  adminDeleteSkill
} = require("../controllers/skillAdminController");

router.use(jwtAuth);
router.get("/", adminListSkills);
router.post("/", skillValidators, adminCreateSkill);
router.put("/:id", skillValidators, adminUpdateSkill);
router.delete("/:id", adminDeleteSkill);

module.exports = router;
