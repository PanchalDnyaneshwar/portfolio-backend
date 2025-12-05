const router = require("express").Router();
const {
  contactValidators,
  handlePublicContact
} = require("../controllers/contactController");

router.post("/", contactValidators, handlePublicContact);

module.exports = router;
