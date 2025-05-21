import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/user/register`, {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      toast.error("Registration failed!");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={boxStyle}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Register
        </Typography>

        <TextField
          label="Name"
          name="name"
          type="text"
          value={inputs.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "#fff" } }}
        />
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
          Register
        </Button>

        <Button
          onClick={() => navigate("/login")}
          sx={{
            mt: 2,
            color: "#ccc",
            "&:hover": { color: "#fff", textDecoration: "underline" },
          }}
        >
          Already have an account? Log in
        </Button>
      </Box>
    </form>
  );
};

export default Register;
