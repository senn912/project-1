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
import TableViewIcon from '@mui/icons-material/TableView';
import BrushIcon from '@mui/icons-material/Brush';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Attendance() {
  const [openDashboard, setOpenDashboard] = useState(false);

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  return (
    <List sx={{ width: 250, bgcolor: "background.paper" }}>
      {/* Dashboard */}
      <ListItemButton onClick={handleDashboardClick}>
        <ListItemIcon>
          <TableViewIcon/>
        </ListItemIcon>
        <ListItemText primary="Attendance" />
        {openDashboard ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openDashboard} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Attendance Report " />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <BrushIcon />
            </ListItemIcon>
            <ListItemText primary="Leave Requests" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Overtime Tracking" />
          </ListItemButton>


        </List>
      </Collapse>
    </List>
  );
}
