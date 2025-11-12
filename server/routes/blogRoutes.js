import express from "express";
import {
  postBlogs,
  getBlogs,
  getSingleBlog,
  updateBlog
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/blogs", postBlogs);
router.get("/blogs", getBlogs);
router.get("/blogs/:slug", getSingleBlog);
router.put("/blogs/:slug", updateBlog);

export default router;
