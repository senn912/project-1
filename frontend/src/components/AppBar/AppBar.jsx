import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

import ModeSelect from "~/components/ModeSelect/ModeSelect";
import LogoSmall from "~/assets/favicon.ico";

import Button from "@mui/material/Button";

import LoginButton from "./Login/LoginButton";
import CreateButton from "./Create/CreateButton";
import { useAuth } from "../../context/AuthContext";
import { menus } from "./Menus/Menus";
import UserMenu from "../User/UserMenu";

function AppBar() {
  const { user } = useAuth();
  return (
    <Box
      px={4}
      sx={{
        backgroundColor: "primary.modeselect",
        width: "100%",
        height: (theme) => theme.manifox.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          <img src={LogoSmall} width="35" height="35" alt="Logo" />
          <Typography
            variant="span"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "primary.appBar",
            }}
          >
            {" "}
            Manifox{" "}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, ml: 5 }}>
          {menus.map((menu, index) => (
            <Button
              key={index}
              component={Link}
              to={menu.path}
              startIcon={menu.icon}
              sx={{ color: "primary.appBar" }}
            >
              {menu.label}
            </Button>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
        {user ? (
          <UserMenu />
        ) : (
          <>
            <CreateButton />
            <LoginButton />
          </>
        )}
        <ModeSelect />
      </Box>
    </Box>
  );
}

export default AppBar;
