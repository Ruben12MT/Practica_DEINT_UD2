import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SavingsIcon from "@mui/icons-material/Savings";
import BasicMenu from "./BasicMenu";
import { Link } from "react-router-dom";
import { Margin } from "@mui/icons-material";
import { Switch } from "@mui/material";
import { useThemeStore } from "../store/useThemeStore";
import Brightness4Icon from '@mui/icons-material/Brightness4';
/**
 * Componente de barra de navegación responsiva.
 * Incluye el logo, título, interruptor de modo oscuro y menús de navegación.
 * 
 * @returns {JSX.Element} La barra de navegación principal.
 */
function ResponsiveAppBar() {
  // Obtiene el estado y la función para cambiar el modo oscuro
  const darkMode = useThemeStore((state) => state.darkMode);
  const setDarkMode = useThemeStore((state) => state.setDarkMode);

  const iconColor = "#fb9e97"; // Color del icono

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
              border: darkMode ? "none" : "2px solid black",
              borderRadius: "50%",
              background: darkMode ? "none" : "black",
              padding: "2px",
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
            sx={{ flexGrow: 1, justifyContent: "end", display: { xs: "flex" }, alignItems: "center" }}
          >
            <Brightness4Icon sx={{ color: darkMode ? "white" : "black" }} />
            <Switch checked={darkMode} onChange={setDarkMode} />

            <BasicMenu titulo={"Bancos"} />
            <BasicMenu titulo={"Sucursales"} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
