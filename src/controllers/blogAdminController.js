const {
  getAllBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getCategories,
  getTags,
} = require("../models/blogModel");

// Get all blog posts (Admin)
exports.getAllAdminBlogPosts = async (req, res) => {
  try {
    const params = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 50,
      category: req.query.category || "",
      tag: req.query.tag || "",
      search: req.query.search || "",
      sort: req.query.sort || "date",
      admin: true, // Allow admin to see all posts
    };

    const result = await getAllBlogPosts(params);

    res.json({
      success: true,
      data: result.posts,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Error in getAllAdminBlogPosts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog posts",
    });
  }
};

// Get single blog post (Admin)
exports.getAdminBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    // Try to get by ID first, then by slug
    let post;
    if (!isNaN(id)) {
      // It's a numeric ID
      const pool = require("../config/db");
      const [rows] = await pool.execute(
        `SELECT b.*, c.name as category_name, c.slug as category_slug
         FROM blog_posts b
         LEFT JOIN blog_categories c ON b.category_id = c.id
         WHERE b.id = ?`,
        [id]
      );
      if (rows.length > 0) {
        post = rows[0];
        // Format post data
        post = {
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featuredImage: post.featured_image,
          category: post.category_name ? { id: post.category_id, name: post.category_name, slug: post.category_slug } : null,
          published: post.published === 1,
          publishedAt: post.published_at,
          updatedAt: post.updated_at,
        };
      }
    } else {
      post = await getBlogPostBySlug(id);
    }

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
    console.error("Error in getAdminBlogPost:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog post",
    });
  }
};

// Create blog post (Admin)
exports.createAdminBlogPost = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      categoryId,
      tagIds,
      published,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const postId = await createBlogPost({
      title,
      slug: slug || generateSlug(title),
      excerpt,
      content,
      featuredImage,
      categoryId: categoryId || null,
      tagIds: tagIds || [],
      published: published || false,
    });

    res.json({
      success: true,
      message: "Blog post created successfully",
      data: { id: postId },
    });
  } catch (error) {
    console.error("Error in createAdminBlogPost:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create blog post",
    });
  }
};

// Update blog post (Admin)
exports.updateAdminBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      categoryId,
      tagIds,
      published,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    await updateBlogPost(id, {
      title,
      slug: slug || generateSlug(title),
      excerpt,
      content,
      featuredImage,
      categoryId: categoryId || null,
      tagIds: tagIds || [],
      published: published || false,
    });

    res.json({
      success: true,
      message: "Blog post updated successfully",
    });
  } catch (error) {
    console.error("Error in updateAdminBlogPost:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog post",
    });
  }
};

// Delete blog post (Admin)
exports.deleteAdminBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteBlogPost(id);

    res.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteAdminBlogPost:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete blog post",
    });
  }
};

// Get categories (Admin)
exports.getAdminCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error in getAdminCategories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

// Get tags (Admin)
exports.getAdminTags = async (req, res) => {
  try {
    const tags = await getTags();
    res.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.error("Error in getAdminTags:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tags",
    });
  }
};

// Helper function to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

