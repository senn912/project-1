import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppBar from "../AppBar/AppBar.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import Container from "@mui/material/Container";

function MainLayout() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ height: (theme) => theme.manifox.appBarHeight }}>
        <AppBar />
      </Box>
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <SideBar />
        <Outlet />
      </Box>
    </Container>
  );
}

export default MainLayout;
