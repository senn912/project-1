import React from "react";

import Box from '@mui/material/Box';
import DashBoard from "./DashBoard";
import Employees from "./Employees";
import Salary from "./Salary";
import Department from "./Departments";
import Attendance from "./Attendance";

 function SideBar() {
    
  return (
    <Box px={2}
      sx={{
        width: (theme) => theme.manifox.sideBarWidth,
        boxSizing: "border-box",
        backgroundColor: "primary.sideBar",
        height: (theme) => `calc(100vh - ${theme.manifox.appBarHeight})`,
        overflowY: "auto",
        scrollbarWidth: "none", 
        
        "&::-webkit-scrollbar": {
          display: "none", 
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