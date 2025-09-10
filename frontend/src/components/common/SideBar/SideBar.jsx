import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import TableViewIcon from "@mui/icons-material/TableView";
import ReportIcon from "@mui/icons-material/Report";
import BrushIcon from "@mui/icons-material/Brush";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import AnalyticsIcon from "@mui/icons-material/Analytics";

import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Diversity1Icon from "@mui/icons-material/Diversity1";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import WorkIcon from "@mui/icons-material/Work";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";


const sidebarMenus = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    children: [
      { label: "Overview", path: "/dashboard/overview", icon: <BarChartIcon /> },
      { label: "Analytics", path: "/dashboard/analytics", icon: <AnalyticsIcon /> },
      { label: "Report", path: "/dashboard/report", icon: <ReportIcon /> },
    ],
  },
  {
    label: "Employees",
    icon: <PermIdentityIcon />,
    children: [
      { label: "Employees List", path: "/employees/list", icon: <RecentActorsIcon /> },
      { label: "Add Employees", path: "/employees/add", icon: <PersonAddAltIcon /> },
      { label: "Edit Employee", path: "/employees/edit", icon: <WorkIcon /> },
      { label: "Roles & Permissions", path: "/employees/role", icon: <AccessTimeIcon /> },
    ],
  },
  {
    label: "Departments",
    icon: <CorporateFareIcon />,
    children: [
      { label: "Department List", path: "/department/list", icon: <BarChartIcon /> },
      { label: "Add Department", path: "/department/add", icon: <GroupAddIcon /> },
      { label: "Manage Teams", path: "/department/manage", icon: <Diversity1Icon /> },
    ],
  },
  {
    label: "Attendance",
    icon: <TableViewIcon />,
    children: [
      { label: "Attendance Report", path: "/attendance/report", icon: <ReportIcon /> },
      { label: "Leave Requests", path: "/attendance/leaverequest", icon: <BrushIcon /> },
      { label: "Overtime Tracking", path: "/attendance/overtime", icon: <AccessTimeIcon /> },
    ],
  },
  {
    label: "Salary",
    icon: <MonetizationOnIcon />,
    children: [
      { label: "Payroll Management", path: "/salary/payroll", icon: <BarChartIcon /> },
      { label: "Contract List", path: "/salary/listcontact", icon: <DescriptionIcon /> },
    ],
  },
];


function MenuItem({ menu }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>{menu.icon}</ListItemIcon>
        <ListItemText primary={menu.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {menu.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menu.children.map((child, idx) => (
              <ListItemButton
                key={idx}
                component={Link}
                to={child.path}
                sx={{ pl: 4 }}
              >
                {child.icon && <ListItemIcon>{child.icon}</ListItemIcon>}
                <ListItemText primary={child.label} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default function SideBar() {
  return (
    <Box
      px={2}
      sx={{
        width: (theme) => theme.manifox.sideBarWidth,
        boxSizing: "border-box",
        backgroundColor: "primary.sideBar",
        height: (theme) => `calc(100vh - ${theme.manifox.appBarHeight})`,
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <List sx={{ px: 3, width: 260 }}>
        {sidebarMenus.map((menu, idx) => (
          <MenuItem key={idx} menu={menu} />
        ))}
      </List>
    </Box>
  );
}
