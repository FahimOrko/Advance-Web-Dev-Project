import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

// get all blogs - /api/v1/blog/all-blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");

    if (!blogs) {
      return res.status(200).send({
        message: "No blogs found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "All blogs successfully fetched",
      blogCount: blogs.length,
      success: true,
      blogs,
    });

    // -------------
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Error in getting all blogs",
      success: false,
      error: e,
    });
  }
};

// get single blog - /api/v1/blog/get-blog/:id
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // const { title, description, image } = req.body;
    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Blog successfully fetched",
      success: true,
      blog,
    });

    // ---------------------------
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Error in getting the single blog",
      success: false,
      error: e,
    });
  }
};

// get single user blog - /api/v1/blog/user-blog/:id
export const getUserBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlog = await userModel.findById(id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        message: "User blog not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "User blog successfully fetched",
      success: true,
      userBlog,
    });

    // ---------------------------
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Error in getting the single blog of the User",
      success: false,
      error: e,
    });
  }
};

// create single blog - /api/v1/blog/create-blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    // validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        message: "Please fill up all the feilds",
        success: false,
        error: e,
      });
    }

    // get the user
    const existingUser = await userModel.findById(user);

    if (!existingUser) {
      return res.status(404).send({
        message: "Unable to find user",
        success: false,
      });
    }

    // create new blog
    const newBlog = new blogModel({ title, description, image, user });

    // start session
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });

    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });

    await session.commitTransaction();

    await newBlog.save();

    return res.status(201).send({
      message: "New blog successfully created",
      success: true,
      newBlog,
    });

    // -------------
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Error in creating the blog",
      success: false,
      error: e,
    });
  }
};

// update single blog - /api/v1/blog/update-blog/:id
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      message: "Blog updated",
      success: true,
      blog,
    });

    // ---------------------------
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Error in updaing the blog",
      success: false,
      error: e,
    });
  }
};

// delete single blog - /api/v1/blog/delete-blog/:id
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();

    return res.status(200).send({
      message: "Blog deleted",
      success: true,
    });

    // ----------------
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Error in deleting the blog",
      success: false,
      error: e,
    });
  }
};
