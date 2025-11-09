import Blog from "./../models/Blog.js";
import jwt from "jsonwebtoken";

const postBlogs = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid authorization format" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const authorId = decodedToken?.id || decodedToken?._id;
    if (!authorId) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newBlog = new Blog({
      title,
      category,
      content,
      author: authorId,
      slug: `temp-slug-${Date.now()}-${Math.random().toString()}`,
    });

    const savedBlog = await newBlog.save();

    savedBlog.slug = `${title.toLowerCase().replace(/ /g, "-")}-${savedBlog._id}`.replace(/[^\w-]+/g, "");
    await savedBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: savedBlog,
    });
  } catch (error) {
    console.error("Error in postBlogs:", error);
    res.status(500).json({ success: false, message: "Failed to create blog" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const { author, status } = req.query;
    let filter = {};

    if (author) filter.author = author;
    if (status) filter.status = status;
    else if (!author) filter.status = "published";

    const blogs = await Blog.find(filter)
      .populate("author", "_id name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

export { postBlogs, getBlogs };