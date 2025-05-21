import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const baseUrl = process.env.REACT_APP_BASE_URL;

const boxStyle = {
  maxWidth: 400,
  margin: "auto",
  marginTop: 8,
  padding: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#1e1e2f",
  borderRadius: 3,
  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  color: "#fff",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/user/login`, inputs);
      if (data.success) {
        localStorage.setItem("userId", data?.user?._id);
        dispatch(authActions.login());
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={boxStyle}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Login
        </Typography>

        <TextField
          label="Email"
          name="email"
          type="email"
          value={inputs.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "#fff" } }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "#fff" } }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, fontWeight: 500 }}
        >
          Login
        </Button>

        <Button
          onClick={() => navigate("/register")}
          sx={{
            mt: 2,
            color: "#ccc",
            "&:hover": { color: "#fff", textDecoration: "underline" },
          }}
        >
          Not a user? Register here
        </Button>
      </Box>
    </form>
  );
};

export default Login;
