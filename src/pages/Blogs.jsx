import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/api/v1/blog/all-blogs");

      if (data && data.success) {
        setBlogs(data.blogs);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs && blogs.map((blog, idx) => <BlogCard key={idx} blog={blog} />)}
    </div>
  );
};

export default Blogs;
