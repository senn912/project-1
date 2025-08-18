import React from "react";

import Box from '@mui/material/Box';



 function SideBar() {
    
  return (
    <Box px={4}
      sx={{
        width: (theme) => theme.manifox.sideBarWidth,
        boxSizing: "border-box",
        backgroundColor: "primary.sideBar",
        height: (theme) => `calc(100vh - ${theme.manifox.appBarHeight})`,
      }}
    >
      
    </Box>
  );
}
export default SideBar