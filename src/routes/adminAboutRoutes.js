const router = require("express").Router();
const jwtAuth = require("../middleware/jwtAuth");
const {
  aboutValidators,
  adminListAbout,
  adminCreateAbout,
  adminUpdateAbout,
  adminDeleteAbout
} = require("../controllers/aboutAdminController");

router.use(jwtAuth);
router.get("/", adminListAbout);
router.post("/", aboutValidators, adminCreateAbout);
router.put("/:id", aboutValidators, adminUpdateAbout);
router.delete("/:id", adminDeleteAbout);

module.exports = router;
