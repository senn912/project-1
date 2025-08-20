import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";


import BarChartIcon from "@mui/icons-material/BarChart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Diversity1Icon from '@mui/icons-material/Diversity1';

export default function Department() {
  const [openDashboard, setOpenDashboard] = useState(false);

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  return (
    <List sx={{ px:3, width: 260, bgcolor: "theme.palette.primary.sideBar" }}>
      {/* Dashboard */}
      <ListItemButton onClick={handleDashboardClick}>
        <ListItemIcon>
          <CorporateFareIcon />
        </ListItemIcon>
        <ListItemText primary="Department" />
        {openDashboard ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openDashboard} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Department List " />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Department" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <Diversity1Icon />
            </ListItemIcon>
            <ListItemText primary="Manage Teams" />
          </ListItemButton>

        </List>
      </Collapse>
    </List>
  );
}
