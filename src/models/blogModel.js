const pool = require("../config/db");

// Get all blog posts with pagination and filters
exports.getAllBlogPosts = async (params = {}) => {
  const {
    page = 1,
    limit = 12,
    category = "",
    tag = "",
    search = "",
    sort = "date",
    exclude = null,
  } = params;

  const { admin = false } = params;
  
  let query = `
    SELECT 
      b.*,
      c.name as category_name,
      c.slug as category_slug,
      GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ',') as tag_names,
      GROUP_CONCAT(DISTINCT t.slug ORDER BY t.slug SEPARATOR ',') as tag_slugs
    FROM blog_posts b
    LEFT JOIN blog_categories c ON b.category_id = c.id
    LEFT JOIN blog_post_tags bpt ON b.id = bpt.post_id
    LEFT JOIN blog_tags t ON bpt.tag_id = t.id
    WHERE 1=1
  `;

  const conditions = [];
  const values = [];

  // Only show published posts for public, all for admin
  if (!admin) {
    conditions.push("b.published = 1");
  }

  if (exclude) {
    conditions.push("b.id != ?");
    values.push(exclude);
  }

  if (category) {
    conditions.push("c.slug = ?");
    values.push(category);
  }

  if (tag) {
    conditions.push("t.slug = ?");
    values.push(tag);
  }

  if (search) {
    conditions.push("(b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ?)");
    const searchPattern = `%${search}%`;
    values.push(searchPattern, searchPattern, searchPattern);
  }

  if (conditions.length > 0) {
    query += " AND " + conditions.join(" AND ");
  }

  query += " GROUP BY b.id";

  // Sorting
  const sortMap = {
    date: "b.published_at DESC",
    title: "b.title ASC",
    views: "b.views DESC",
  };
  query += ` ORDER BY ${sortMap[sort] || sortMap.date}`;

  // Pagination
  const offset = (page - 1) * limit;
  query += " LIMIT ? OFFSET ?";
  values.push(parseInt(limit), offset);

  try {
    const [rows] = await pool.execute(query, values);

    // Get total count
    let countQuery = `
      SELECT COUNT(DISTINCT b.id) as total
      FROM blog_posts b
      LEFT JOIN blog_categories c ON b.category_id = c.id
      LEFT JOIN blog_post_tags bpt ON b.id = bpt.post_id
      LEFT JOIN blog_tags t ON bpt.tag_id = t.id
      WHERE b.published = 1
    `;

    const countConditions = [];
    const countValues = [];

    if (exclude) {
      countConditions.push("b.id != ?");
      countValues.push(exclude);
    }

    if (category) {
      countConditions.push("c.slug = ?");
      countValues.push(category);
    }

    if (tag) {
      countConditions.push("t.slug = ?");
      countValues.push(tag);
    }

    if (search) {
      countConditions.push("(b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ?)");
      const searchPattern = `%${search}%`;
      countValues.push(searchPattern, searchPattern, searchPattern);
    }

    if (countConditions.length > 0) {
      countQuery += " AND " + countConditions.join(" AND ");
    }

    const [countRows] = await pool.execute(countQuery, countValues);
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    // Format posts
    const posts = rows.map((row) => ({
      id: row.id,
      _id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      featuredImage: row.featured_image,
      category: row.category_name
        ? {
            id: row.category_id,
            name: row.category_name,
            slug: row.category_slug,
          }
        : null,
      tags: row.tag_names
        ? row.tag_names.split(",").map((name, index) => ({
            name: name.trim(),
            slug: row.tag_slugs.split(",")[index]?.trim() || "",
          }))
        : [],
      publishedAt: row.published_at,
      updatedAt: row.updated_at,
      views: row.views || 0,
      readingTime: Math.ceil((row.content?.length || 0) / 200),
    }));

    return {
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

// Get single blog post by slug
exports.getBlogPostBySlug = async (slug) => {
  const query = `
    SELECT 
      b.*,
      c.name as category_name,
      c.slug as category_slug,
      GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ',') as tag_names,
      GROUP_CONCAT(DISTINCT t.slug ORDER BY t.slug SEPARATOR ',') as tag_slugs
    FROM blog_posts b
    LEFT JOIN blog_categories c ON b.category_id = c.id
    LEFT JOIN blog_post_tags bpt ON b.id = bpt.post_id
    LEFT JOIN blog_tags t ON bpt.tag_id = t.id
    WHERE b.slug = ? AND b.published = 1
    GROUP BY b.id
  `;

  try {
    const [rows] = await pool.execute(query, [slug]);

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];

    // Increment views
    await pool.execute("UPDATE blog_posts SET views = views + 1 WHERE id = ?", [
      row.id,
    ]);

    return {
      id: row.id,
      _id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      featuredImage: row.featured_image,
      category: row.category_name
        ? {
            id: row.category_id,
            name: row.category_name,
            slug: row.category_slug,
          }
        : null,
      tags: row.tag_names
        ? row.tag_names.split(",").map((name, index) => ({
            name: name.trim(),
            slug: row.tag_slugs.split(",")[index]?.trim() || "",
          }))
        : [],
      publishedAt: row.published_at,
      updatedAt: row.updated_at,
      views: (row.views || 0) + 1,
      readingTime: Math.ceil((row.content?.length || 0) / 200),
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
};

// Get categories with post counts
exports.getCategories = async () => {
  const query = `
    SELECT 
      c.*,
      COUNT(b.id) as count
    FROM blog_categories c
    LEFT JOIN blog_posts b ON c.id = b.category_id AND b.published = 1
    GROUP BY c.id
    ORDER BY c.name ASC
  `;

  try {
    const [rows] = await pool.execute(query);
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      count: row.count || 0,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Get tags with post counts
exports.getTags = async () => {
  const query = `
    SELECT 
      t.*,
      COUNT(bpt.post_id) as count
    FROM blog_tags t
    LEFT JOIN blog_post_tags bpt ON t.id = bpt.tag_id
    LEFT JOIN blog_posts b ON bpt.post_id = b.id AND b.published = 1
    GROUP BY t.id
    HAVING count > 0
    ORDER BY count DESC, t.name ASC
    LIMIT 20
  `;

  try {
    const [rows] = await pool.execute(query);
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      count: row.count || 0,
    }));
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

// Get blog statistics
exports.getBlogStats = async () => {
  try {
    const [postCount] = await pool.execute(
      "SELECT COUNT(*) as total FROM blog_posts WHERE published = 1"
    );
    const [categoryCount] = await pool.execute(
      "SELECT COUNT(*) as total FROM blog_categories"
    );
    const [tagCount] = await pool.execute(
      "SELECT COUNT(*) as total FROM blog_tags"
    );

    return {
      totalPosts: postCount[0].total,
      totalCategories: categoryCount[0].total,
      totalTags: tagCount[0].total,
    };
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    throw error;
  }
};

// Create blog post (Admin)
exports.createBlogPost = async (postData) => {
  const {
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    categoryId,
    tagIds = [],
    published = false,
  } = postData;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // Insert post
    const [result] = await connection.execute(
      `INSERT INTO blog_posts 
       (title, slug, excerpt, content, featured_image, category_id, published, published_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
      [
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        categoryId || null,
        published ? 1 : 0,
      ]
    );

    const postId = result.insertId;

    // Insert tags
    if (tagIds.length > 0) {
      const tagValues = tagIds.map((tagId) => [postId, tagId]);
      await connection.query(
        "INSERT INTO blog_post_tags (post_id, tag_id) VALUES ?",
        [tagValues]
      );
    }

    await connection.commit();
    return postId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Update blog post (Admin)
exports.updateBlogPost = async (id, postData) => {
  const {
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    categoryId,
    tagIds = [],
    published,
  } = postData;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // Update post
    await connection.execute(
      `UPDATE blog_posts 
       SET title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, 
           category_id = ?, published = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        categoryId || null,
        published ? 1 : 0,
        id,
      ]
    );

    // Update tags
    await connection.execute(
      "DELETE FROM blog_post_tags WHERE post_id = ?",
      [id]
    );

    if (tagIds.length > 0) {
      const tagValues = tagIds.map((tagId) => [id, tagId]);
      await connection.query(
        "INSERT INTO blog_post_tags (post_id, tag_id) VALUES ?",
        [tagValues]
      );
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Delete blog post (Admin)
exports.deleteBlogPost = async (id) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // Delete tags
    await connection.execute("DELETE FROM blog_post_tags WHERE post_id = ?", [
      id,
    ]);

    // Delete post
    await connection.execute("DELETE FROM blog_posts WHERE id = ?", [id]);

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

