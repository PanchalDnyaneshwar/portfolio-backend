const router = require("express").Router();
const { signup, login, getCurrentUser } = require("../controllers/userAuthController");
const userAuth = require("../middleware/userAuth");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/me", userAuth, getCurrentUser);

module.exports = router;

