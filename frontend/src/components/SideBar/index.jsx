import React from "react";

import Box from '@mui/material/Box';
import DashBoard from "./DashBoard";
import Employees from "./Employees";
import Salary from "./Salary";
import Department from "./Departments";
import Attendance from "./Attendance";

 function SideBar() {
    
  return (
    <Box px={4}
      sx={{
        width: (theme) => theme.manifox.sideBarWidth,
        boxSizing: "border-box",
        backgroundColor: "primary.sideBar",
        height: (theme) => `calc(100vh - ${theme.manifox.appBarHeight})`,
        overflowY: "auto", // ✅ cho phép scroll
        scrollbarWidth: "none", // ✅ ẩn scrollbar Firefox
        "&::-webkit-scrollbar": {
          display: "none", // ✅ ẩn scrollbar Chrome/Safari/Edge
        }
      }}
    >
      <DashBoard/>
      <Employees/>
      <Department/>
      <Attendance/>
      <Salary />
      
    </Box>
    
  )
}
export default SideBar