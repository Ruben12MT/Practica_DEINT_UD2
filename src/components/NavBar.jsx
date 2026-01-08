import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';
import BasicMenu from "./BasicMenu";
import { Link } from "react-router-dom";
import { Margin } from "@mui/icons-material";

const pages = ["Bancos", "Sucursales"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const fontColor = "black";
  const iconColor = "#fb9e97";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static"
    sx={{
          background: "#c0e9fb",
          mb: 2
        }}>
      <Container
        maxWidth="xl"
      >
        <Toolbar
          disableGutters
        >
          <SavingsTwoToneIcon 
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: iconColor }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: fontColor,
              textDecoration: "none",
            }}
          >
            BANKSAPP
          </Typography>

          <SavingsTwoToneIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: iconColor }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: fontColor,
              textDecoration: "none",
            }}
          >
            BANKSAPP
          </Typography>
          <Box
            sx={{ flexGrow: 1, justifyContent: "end", display: { xs: "flex" } }}
          >
            <BasicMenu titulo={"Bancos"}></BasicMenu>
            <BasicMenu titulo={"Sucursales"}></BasicMenu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
