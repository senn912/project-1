import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";


import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from "react-router-dom";

function Employees() {
  const [openDashboard, setOpenDashboard] = useState(false);

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  return (
    <List sx={{ px:3, width: 260, bgcolor: "theme.palette.primary.sideBar" }}>
      {/* Dashboard */}
      <ListItemButton onClick={handleDashboardClick}>
        <ListItemIcon>
          <PermIdentityIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" />
        {openDashboard ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openDashboard} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          <ListItemButton component={Link} to="/employees/list" sx={{ pl: 4 }}>
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary="Employees List" />
          </ListItemButton>

          <ListItemButton component={Link} to="/employees/add" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="Add Employees" />
          </ListItemButton>

          <ListItemButton component={Link} to="/employees/edit" sx={{ pl: 4 }}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Edit / Update Employee" />
          </ListItemButton>

          <ListItemButton component={Link} to="/employees/role" sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Roles & Permissions" />
          </ListItemButton>
          
        </List>
      </Collapse>
    </List>
  );
}

export default Employees