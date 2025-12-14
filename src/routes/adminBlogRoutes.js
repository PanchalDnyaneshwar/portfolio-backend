const router = require("express").Router();
const jwtAuth = require("../middleware/jwtAuth");
const {
  getAllAdminBlogPosts,
  getAdminBlogPost,
  createAdminBlogPost,
  updateAdminBlogPost,
  deleteAdminBlogPost,
  getAdminCategories,
  getAdminTags,
} = require("../controllers/blogAdminController");

// All admin blog routes require authentication
router.use(jwtAuth);

// Blog posts
router.get("/", getAllAdminBlogPosts);
router.get("/categories", getAdminCategories);
router.get("/tags", getAdminTags);
router.get("/:id", getAdminBlogPost);
router.post("/", createAdminBlogPost);
router.put("/:id", updateAdminBlogPost);
router.delete("/:id", deleteAdminBlogPost);

module.exports = router;

