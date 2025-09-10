import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const { user, logoutUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logoutUser();
    handleClose();
  };
  const handleManage = () => {
    navigate("/manageaccount");
  };
  if (!user) return null;

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        Hello {user.fullName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleManage}>Information</MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  );
}
