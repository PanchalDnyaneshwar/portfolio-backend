const router = require("express").Router();
const { getPublicProjects } = require("../controllers/projectController");

router.get("/", getPublicProjects);

module.exports = router;
