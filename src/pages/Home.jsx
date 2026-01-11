import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar"
import Footer from "../components/Footer";
function Home({ darkMode, toggleTheme }) {
  return (
    <>
      <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />

      <div>
        <Outlet />
      </div>

      <Footer darkMode={darkMode}></Footer>
    </>
  );
}

export default Home;
