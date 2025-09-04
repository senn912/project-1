import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

import ModeSelect from "~/components/ModeSelect/ModeSelect";
import LogoSmall from "~/assets/favicon.ico";

import Button from "@mui/material/Button";

import { useAuth } from "../../context/AuthContext";
import Menus from "./Menus/Menus";
import UserMenu from "../User/UserMenu";

import AccountButton from "./AccountButton/AccountButton";

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
          <Menus />
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
        {user ? (
          <UserMenu />
        ) : (
          <>
            <AccountButton />
          </>
        )}
        <ModeSelect />
      </Box>
    </Box>
  );
}

export default AppBar;
