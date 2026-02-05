import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FormBank from "./components/bank_components/FormBank";
import BanksList from "./components/bank_components/BanksList";
import DataGridBank from "./components/bank_components/DataGridBank";
import BanksParamListForm from "./components/bank_components/BanksParamListForm";
import BankModifier from "./components/bank_components/BankModifier";
import FormBranch from "./components/branch_components/FormBranch";
import BranchesList from "./components/branch_components/BranchesList";
import BranchesParamListForm from "./components/branch_components/BranchesParamListForm";
import BranchModifier from "./components/branch_components/BranchModifier";
import BankCardsList from "./components/bank_components/BankCardsList";
import { useThemeStore } from "./store/useThemeStore";
import LandPage from "./components/LandPage";
import BranchGraph from "./components/branch_components/BranchGraph";

/**
 * Componente principal de la aplicación.
 * Configura el enrutador (React Router), el tema visual (Material UI) y la gestión del modo oscuro.
 * 
 * @returns {JSX.Element} El componente raíz de la aplicación con proveedores de contexto.
 */
export default function Main() {
  // Obtiene el estado del modo oscuro desde el store global
  const darkMode = useThemeStore((state) => state.darkMode);

  // Crea el tema personalizado basándose en el modo (claro/oscuro)
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        paper: darkMode ? "#000000" : "#c0e9fb", // Fondo para componentes tipo tarjeta
        default: darkMode ? "#121212" : "#ffffff", // Fondo por defecto de la aplicación
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000", // Color de texto principal
      },
    },
  });

  // Configuración de las rutas de la aplicación
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home />
      ),
      errorElement: <ErrorPage />, // Página de error personalizada
      children: [
        { path: "", element: <LandPage /> }, // Página de aterrizaje por defecto
        { path: "altabanco", element: <FormBank /> }, // Formulario de alta de banco
        {
          path: "modificacionbanco/:id",
          element: <BankModifier />, // Formulario de modificación de banco
        },
        {
          path: "borradobanco",
          element: <>Aquí se hará el borrado del banco</>, // Componente temporal para borrado
        },
        {
          path: "listadobanco",
          element: <BanksList />, // Listado de bancos
        },
        {
          path: "listadobanco/datagrid",
          element: <DataGridBank />, // Vista de bancos en DataGrid
        },
        {
          path: "listadocardsbanco",
          element: <BankCardsList />, // Vista de bancos en tarjetas
        },
        {
          path: "listadoparametrizadobanco",
          element: <BanksParamListForm />, // Listado parametrizado de bancos
        },
        {
          path: "altasucursal",
          element: <FormBranch />, // Formulario de alta de sucursal
        },
        {
          path: "modificacionsucursal/:id",
          element: <BranchModifier />, // Formulario de modificación de sucursal
        },
        {
          path: "listadosucursal",
          element: <BranchesList />, // Listado de sucursales
        },
        {
          path: "listadoparametrizadosucursal",
          element: <BranchesParamListForm />, // Listado parametrizado de sucursales
        },
        {
          path: "graficasucursales",
          element: <BranchGraph />, // Gráfica de sucursales
        },
      ],
    },
  ]);

  return (
    // Proveedor del tema para que esté disponible en toda la app
    <ThemeProvider theme={theme}>
      {/* Normalización de estilos CSS */}
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
