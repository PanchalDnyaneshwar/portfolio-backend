const router = require("express").Router();
const { getPublicAbout } = require("../controllers/aboutController");

router.get("/", getPublicAbout);

module.exports = router;
