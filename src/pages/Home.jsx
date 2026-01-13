import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
function Home({ darkMode, toggleTheme }) {
  return (
    <Container
      maxWidth={false}
      
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />

      <div>
        <Outlet />
      </div>

      <Footer darkMode={darkMode}></Footer>
    </Container>
  );
}

export default Home;
