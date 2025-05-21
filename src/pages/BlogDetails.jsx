import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL;

const BlogDetails = () => {
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/v1/blog/update-blog/${id}`,
        {
          ...inputs,
          user: userId,
        }
      );
      if (data?.success) {
        toast.success("Blog updated successfully!");
        navigate("/my-blogs");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(baseUrl + `/api/v1/blog/get-blog/${id}`);

      if (data.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog?.title,
          description: data?.blog?.description,
          image: data?.blog?.image,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          backgroundColor: "#1e1e2f",
          borderRadius: "16px",
          padding: 4,
          margin: "40px auto",
          width: { xs: "90%", sm: "70%", md: "60%" },
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            color: "white",
            mb: 2,
          }}
        >
          Update your blog
        </Typography>

        <InputLabel sx={{ fontSize: "18px", color: "#ccc", fontWeight: 500 }}>
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#555",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#bbb",
              },
            },
          }}
        />

        <InputLabel sx={{ fontSize: "18px", color: "#ccc", fontWeight: 500 }}>
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          multiline
          rows={4}
          sx={{
            textarea: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#555",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#bbb",
              },
            },
          }}
        />

        <InputLabel sx={{ fontSize: "18px", color: "#ccc", fontWeight: 500 }}>
          Image URL
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#555",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#bbb",
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#33334d",
            color: "white",
            fontWeight: 600,
            mt: 2,
            "&:hover": {
              backgroundColor: "#44445f",
            },
          }}
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default BlogDetails;
