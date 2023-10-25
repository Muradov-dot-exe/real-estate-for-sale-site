import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import CustomizedSnackbars from "../components/notificationPopup";
import AppHeader from "../navbars/AppHeader";

const Layout = () => {
  return (
    <>
      <AppHeader />
      <CustomizedSnackbars />

      <Box sx={{ position: "relative", backgroundColor: "beige" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
