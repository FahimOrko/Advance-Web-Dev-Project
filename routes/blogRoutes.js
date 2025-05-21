import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getUserBlog,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// get all blogs - /api/v1/blog/all-blogs
router.get("/all-blogs", getAllBlogs);

// get single blog - /api/v1/blog/get-blog/:id
router.get("/get-blog/:id", getSingleBlog);

// get single user blog - /api/v1/blog/user-blog/:id
router.get("/user-blog/:id", getUserBlog);

// create blog - /api/v1/blog/create-blog
router.post("/create-blog", createBlog);

// update blog - /api/v1/blog/update-blog/:id
router.put("/update-blog/:id", updateBlog);

// delete blog - /api/v1/blog/delete-blog/:id
router.delete("/delete-blog/:id", deleteBlog);

export default router;
