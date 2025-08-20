import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReportIcon from '@mui/icons-material/Report';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function DashBoard() {
  const [openDashboard, setOpenDashboard] = useState(false);

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  return (
    <List sx={{ px:3, width: 260, backgroundColor: "theme.palette.primary.sideBar" }}>
      {/* Dashboard */}
      <ListItemButton onClick={handleDashboardClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
        {openDashboard ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openDashboard} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Overview " />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
