const router = require("express").Router();
const jwtAuth = require("../middleware/jwtAuth");
const {
  adminListContacts,
  adminDeleteContact
} = require("../controllers/contactAdminController");

router.use(jwtAuth);
router.get("/", adminListContacts);
router.delete("/:id", adminDeleteContact);

module.exports = router;
