const {
  getAllBlogPosts,
  getBlogPostBySlug,
  getCategories,
  getTags,
  getBlogStats,
} = require("../models/blogModel");

// Get all blog posts (Public)
exports.getPublicBlogPosts = async (req, res) => {
  try {
    const params = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 12,
      category: req.query.category || "",
      tag: req.query.tag || "",
      search: req.query.search || "",
      sort: req.query.sort || "date",
    };

    const result = await getAllBlogPosts(params);

    res.json({
      success: true,
      data: result.posts,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Error in getPublicBlogPosts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog posts",
    });
  }
};

// Get single blog post (Public)
exports.getPublicBlogPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Error in getPublicBlogPost:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog post",
    });
  }
};

// Get categories (Public)
exports.getPublicCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error in getPublicCategories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

// Get tags (Public)
exports.getPublicTags = async (req, res) => {
  try {
    const tags = await getTags();
    res.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.error("Error in getPublicTags:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tags",
    });
  }
};

// Get related posts (Public)
exports.getRelatedPosts = async (req, res) => {
  try {
    const { exclude, category, tags, limit = 3 } = req.query;

    const params = {
      page: 1,
      limit: parseInt(limit),
      category: category || "",
      tag: tags?.split(",")[0] || "",
      exclude: exclude || null,
    };

    const result = await getAllBlogPosts(params);

    res.json({
      success: true,
      data: result.posts,
    });
  } catch (error) {
    console.error("Error in getRelatedPosts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch related posts",
    });
  }
};

// Get blog statistics (Public)
exports.getPublicBlogStats = async (req, res) => {
  try {
    const stats = await getBlogStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error in getPublicBlogStats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog statistics",
    });
  }
};

