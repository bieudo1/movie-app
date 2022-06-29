import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";

function MainHeader() {
  const { user } = useAuth();
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <Box>
      <AppBar sx = {{backgroundColor:'#121212'}} position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton  >
          <Typography variant="h6" color="inherit" component="div">
            CoderStore
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" color="inherit" component="div">
            Welcome {user?.username}!
          </Typography>
          <button
        onClick={() => {
          auth.logout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;