const router = require("express").Router();
const { getPublicWork } = require("../controllers/workController");

router.get("/", getPublicWork);

module.exports = router;
