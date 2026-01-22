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

export default function Main() {
  const darkMode = useThemeStore((state) => state.darkMode);
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
        <Home/>
      ),
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <LandPage /> },
        { path: "altabanco", element: <FormBank /> },
        {
          path: "modificacionbanco/:id",
          element: <BankModifier />,
        },
        {
          path: "borradobanco",
          element: <>Aquí se hará el borrado del banco</>,
        },
        {
          path: "listadobanco",
          element: <BanksList />,
        },
        {
          path: "listadobanco/datagrid",
          element: <DataGridBank />,
        },
        {
          path: "listadocardsbanco",
          element: <BankCardsList />,
        },
        {
          path: "listadoparametrizadobanco",
          element: <BanksParamListForm />,
        },
        {
          path: "altasucursal",
          element: <FormBranch />,
        },
        {
          path: "modificacionsucursal/:id",
          element: <BranchModifier/>,
        },
        {
          path: "listadosucursal",
          element: <BranchesList />,
        },
        {
          path: "listadoparametrizadosucursal",
          element: <BranchesParamListForm />,
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
    <Main />
  </React.StrictMode>
);
