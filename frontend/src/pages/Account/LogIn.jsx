import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react"; 
import { Box, Button, Container, TextField, Typography, Paper, } from "@mui/material"; 
import axios from "axios"; 


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [nickName, setNickName] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:8088/api/v1/login", {
        nickName,
        password,
      }, { withCredentials: true });

      console.log("Login success:", res.data);

    const token = res.data.token;
    const fullName = res.data.user.fullName;
      login({ fullName }, token);

      navigate("/");
    } catch (err) {
      if (err.response) setError(err.response.data.message || "Login failed");
      else setError("Server error");
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
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nick Name"
            variant="outlined"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
