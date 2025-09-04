import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function AccountButton() {
  return (
    <Box sx={{ height: 1, display: "flex", alignItems: "center", gap: 2 }}>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        color="secondary"
        id="login-button"
      >
        Login
      </Button>

      <Button
        component={Link}
        to="/signup"
        variant="contained"
        color="secondary"
        id="signup-button"
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default AccountButton;
