import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import GroupsIcon from '@mui/icons-material/Groups';
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function Employees() {
  const [openDashboard, setOpenDashboard] = useState(false);

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  return (
    <List sx={{ width: 250, bgcolor: "background.paper" }}>
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
          
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary="Employees List" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="Add Employees" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Edit / Update Employee" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
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