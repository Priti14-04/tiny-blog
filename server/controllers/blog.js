


import Blog from "./../models/Blog.js";

const postBlogs = async (req, res) => {
  const { title, category, content, author } = req.body;

  if (!title || !category || !content || !author) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newBlog = new Blog({
    title,
    category,
    content,
    author,
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
