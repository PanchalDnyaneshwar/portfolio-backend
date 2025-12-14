const router = require("express").Router();
const {
  getPublicBlogPosts,
  getPublicBlogPost,
  getPublicCategories,
  getPublicTags,
  getRelatedPosts,
  getPublicBlogStats,
} = require("../controllers/blogController");

// Public routes
router.get("/", getPublicBlogPosts);
router.get("/stats", getPublicBlogStats);
router.get("/categories", getPublicCategories);
router.get("/tags", getPublicTags);
router.get("/related", getRelatedPosts);
router.get("/:slug", getPublicBlogPost);

module.exports = router;

