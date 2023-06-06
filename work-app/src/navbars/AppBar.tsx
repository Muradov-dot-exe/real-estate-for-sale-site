import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const HomeBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" href="/">
              Home
            </Button>
            <Button color="inherit">Products</Button>
            <Button color="inherit">Locations</Button>
          </Typography>
          <Button color="inherit" href="/signup">
            Sign Up
          </Button>
          <Button color="inherit" href="/signin">
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default HomeBar;