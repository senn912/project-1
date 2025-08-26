import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import AppBar from "../AppBar/AppBar.jsx";

function Layout_Login () {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* AppBar cho login */}
      <Box sx={{ height: (theme) => theme.manifox.appBarHeight }}>
        <AppBar />
      </Box>

      {/* Nội dung login */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default Layout_Login ;
