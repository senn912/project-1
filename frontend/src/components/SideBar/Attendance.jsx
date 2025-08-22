import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";

import ReportIcon from '@mui/icons-material/Report';
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
    <List sx={{ px:3, width: 260, bgcolor: "theme.palette.primary.sideBar", }}>
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

          <ListItemButton component={Link} to="/attendance/report" sx={{ pl: 4 }}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Attendance Report " />
          </ListItemButton>

          <ListItemButton component={Link} to="/attendance/leavereq" sx={{ pl: 4 }}>
            <ListItemIcon>
              <BrushIcon />
            </ListItemIcon>
            <ListItemText primary="Leave Requests" />
          </ListItemButton>

          <ListItemButton component={Link} to="/attendance/overtime" sx={{ pl: 4 }}>
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
