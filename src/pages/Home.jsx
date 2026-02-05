import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
/**
 * Componente de la página principal (Layout).
 * Estructura la aplicación con una barra de navegación, el contenido principal (Outlet) y el pie de página.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.darkMode - Estado del modo oscuro (prop drilling a hijos).
 * @param {function} props.toggleTheme - Función para alternar el tema (prop drilling a hijos).
 * @returns {JSX.Element} Layout principal de la aplicación.
 */
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
        {/* Renderiza el contenido de la ruta hija actual */}
        <Outlet />
      </div>

      <Footer darkMode={darkMode}></Footer>
    </Container>
  );
}

export default Home;
