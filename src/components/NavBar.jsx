import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SavingsIcon from '@mui/icons-material/Savings';import BasicMenu from "./BasicMenu";
import { Link } from "react-router-dom";
import { Margin } from "@mui/icons-material";
import { Switch } from "@mui/material";


function ResponsiveAppBar({ darkMode, toggleTheme }) {


  const iconColor = "#fb9e97";

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "background.paper",
        mb: 2,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SavingsIcon
            sx={{
              display: "flex",
              mr: 1,
              color: iconColor,
              border: "2px solid" + darkMode ? "none" : "black",
              borderRadius: "50%",
              background: darkMode ? "none" : "black",
              padding: "2px"
            }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "text.primary",
              textDecoration: "none",
            }}
          >
            BANKSAPP
          </Typography>

          <Box
            sx={{ flexGrow: 1, justifyContent: "end", display: { xs: "flex" } }}
          >
            <Switch checked={darkMode} onChange={toggleTheme} />

            <BasicMenu titulo={"Bancos"} />
            <BasicMenu titulo={"Sucursales"} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
