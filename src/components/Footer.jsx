import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Footer({ darkMode }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "0 -3px 3px rgba(0,0,0,0.15)"
      }}
    >
      <Toolbar>
        <Typography variant="body1" sx={{ flexGrow: 1, textAlign: "center" }}>
          © 2026 BanksApp
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
