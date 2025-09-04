import { MENUS } from "~/utils/constants/constant";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Menus() {
  return (
    <>
      {MENUS.map((menu, index) => (
        <Button
          key={index}
          component={Link}
          to={menu.path}
          sx={{ color: "primary.appBar" }}
        >
          {menu.label}
        </Button>
      ))}
    </>
  );
}
