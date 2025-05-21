import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";

const baseUrl = process.env.REACT_APP_BASE_URL;

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserBlogs = async () => {
    setIsLoading(true);
    setError("");
    try {
      const id = localStorage.getItem("userId");
      if (!id) {
        setError("User not logged in");
        setBlogs([]);
        return;
      }
      const { data } = await axios.get(
        `${baseUrl}/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data.userBlog.blogs || []);
      } else {
        setError("Failed to load blogs");
      }
    } catch (e) {
      setError("Failed to fetch blogs. Please try again later.");
      setBlogs([]);
      console.error("Failed to fetch blogs:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          maxWidth: 700,
          margin: "2rem auto",
          textAlign: "center",
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!blogs.length) {
    return (
      <Box
        sx={{
          maxWidth: 700,
          margin: "2rem auto",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom>
          No Blogs Yet
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create a blog first to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {blogs.map((blog, idx) => (
        <BlogCard
          key={idx}
          blog={blog}
          isUser={localStorage.getItem("userId") === blog.user}
        />
      ))}
    </Box>
  );
};

export default MyBlogs;
