import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  useTheme,
  Box,
  IconButton,
} from "@mui/material";
import { cyan } from "@mui/material/colors";
import { formatDateTime } from "../utils/helpers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function BlogCard({ blog, isUser }) {
  const theme = useTheme();

  const navigate = useNavigate();

  // Defensive destructuring with fallback values
  const {
    _id,
    title = "Untitled",
    description = "No description available",
    image = null,
    user = {},
    updatedAt = null,
  } = blog || {};

  const username = user?.username || "User";

  const handleEdit = () => {
    navigate(`/blog-details/${_id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        baseUrl + `/api/v1/blog/delete-blog/${_id}`
      );
      if (data.success) {
        toast.success("Post Deleted Successfully!");
        navigate("/my-blogs");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "2rem auto",
        borderRadius: "1rem",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 4px 20px rgba(255, 255, 255, 0.05)"
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: cyan[500], fontWeight: 600 }}>
            {username[0]?.toUpperCase() || "U"}
          </Avatar>
        }
        title={
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {title}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {username} •{" "}
            {updatedAt ? formatDateTime(updatedAt) : "Date unknown"}
          </Typography>
        }
      />
      {image && (
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={title}
          sx={{
            objectFit: "cover",
            borderRadius: "0 0 1rem 1rem",
            maxHeight: "250px",
          }}
        />
      )}
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            lineHeight: 1.6,
          }}
        >
          <Typography variant="h6">Description</Typography>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
