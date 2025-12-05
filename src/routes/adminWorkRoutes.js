const router = require("express").Router();
const jwtAuth = require("../middleware/jwtAuth");
const {
  workValidators,
  adminListWork,
  adminCreateWork,
  adminUpdateWork,
  adminDeleteWork
} = require("../controllers/workAdminController");

router.use(jwtAuth);
router.get("/", adminListWork);
router.post("/", workValidators, adminCreateWork);
router.put("/:id", workValidators, adminUpdateWork);
router.delete("/:id", adminDeleteWork);

module.exports = router;
