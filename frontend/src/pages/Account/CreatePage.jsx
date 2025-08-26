import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    nickName: "",
    fullName: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await axios.post(
        "http://localhost:8088/api/v1/users",
        formData
      );

      setMessage("Created 🎉");
      console.log("API Response:", res.data);

     setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Create Error");
      } else {
        setError("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
          Create Account
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Nick Name"
            name="nickName"
            value={formData.nickName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
                mt: 2,
                backgroundColor: "primary.modeselect",   // màu chính
                "&:hover": {
                backgroundColor: "primary.dark", // hover thì tối hơn chút
                transform: "scale(1.05)",        // phóng to nhẹ
                },
                transition: "all 0.2s ease-in-out", // hiệu ứng mượt
            }}
          >
            {loading ? "Creating..." : "Submit"}
          </Button>
          <Box sx={{justifyContent: "center", display: "flex", gap: 2, mt: 2 }}>
          <Button
                variant="contained"
                size="large"
                disabled={loading}
                onClick={() => navigate("/login")}
                sx={{
                backgroundColor: "primary.modeselect",
                "&:hover": {
                    backgroundColor: "primary.dark",
                    transform: "scale(1.05)",
                },
                transition: "all 0.2s ease-in-out",
                }}
          >
            Log In
          </Button>
          <Button
                variant="contained"
                size="large"
                disabled={loading}
                onClick={() => navigate("/")}
                sx={{
                backgroundColor: "primary.modeselect",
                "&:hover": {
                    backgroundColor: "primary.dark",
                    transform: "scale(1.05)",
                },
                transition: "all 0.2s ease-in-out",
                }}
          >
            Home
          </Button>
          </Box>
        </Box>
    
      </Paper>
    </Container>
  );
}
