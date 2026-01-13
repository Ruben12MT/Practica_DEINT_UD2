import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FormBank from "./components/FormBank";
import BanksList from "./components/BanksList";
import DataGridBank from "./components/DataGridBank";
import BankModifier from "./components/BankModifier";

function Main() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        paper: darkMode ? "#000000" : "#c0e9fb",
        default: darkMode ? "#121212" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
      ),
      errorElement: <ErrorPage />,
      children: [
        { path: "altabanco", element: <FormBank /> },
        {
          path: "modificacionbanco/:id",
          element:<BankModifier/>,
        },
        {
          path: "borradobanco",
          element: <>Aquí se hará el borrado del banco</>,
        },
        {
          path: "listadobanco",
          element: <BanksList/>,
        },
                {
          path: "listadobanco/datagrid",
          element: <DataGridBank/>,
        },
        {
          path: "listadoparametrizadobanco",
          element: <>Aquí se mostrará el listado parametrizado de bancos</>,
        },

        {
          path: "altasucursal",
          element: <>Aquí se hará el alta de la sucursal</>,
        },
        {
          path: "modificacionsucursal",
          element: <>Aquí se hará la modificación de la sucursal</>,
        },
        {
          path: "borradosucursal",
          element: <>Aquí se hará el borrado de la sucursal</>,
        },
        {
          path: "listadosucursal",
          element: <>Aquí se mostrará el listado de sucursales</>,
        },
        {
          path: "listadoparametrizadosucursal",
          element: <>Aquí se mostrará el listado parametrizado de sucursales</>,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main  />
  </React.StrictMode>
);
