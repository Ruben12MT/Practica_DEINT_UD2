import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Grid, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventDialog from "../EventDialog";
import ConfirmDialog from "../ConfirmDialog";
import { Link } from "react-router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InformeListadoSucursales from "./informeListadoSucursales";

/**
 * Componente que lista las sucursales en una tabla.
 * Permite eliminar sucursales, editarlas y descargar un informe completo en PDF.
 * 
 * @returns {JSX.Element} Listado de sucursales con controles y exportación.
 */
export default function BranchesList() {
  const [rows, setRows] = useState([]); // Filas de la tabla

  // Estados para el diálogo informativo
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Título");
  const [dialogDescription, setDialogDescripcion] = useState("Descripción");

  // Estados para confiramción de borrado
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(-1);

  /**
   * Abre o cierra el diálogo informativo.
   * @param {string} titulo - Título del diálogo.
   * @param {string} descripcion - Contenido del diálogo.
   * @param {boolean} abrir - Estado de apertura.
   */
  function llamarDialog(titulo, descripcion, abrir) {
    setDialogTitle(titulo);
    setDialogDescripcion(descripcion);
    setOpenDialog(abrir);
  }

  const handleRemoveBranch = async (id) => {
    try {
      const respuesta = await fetch(
        window.__APP_CONFIG__.API_URL + "/branches/" + id,
        {
          method: "DELETE",
        },
      );

      const oJson = await respuesta.json();
      console.log(oJson);

      llamarDialog(
        oJson.ok ? "Sucursal borrada" : "No se puede borrar la sucursal",
        oJson.mensaje,
        true,
      );

      if (oJson.ok) {
        setRows(rows.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error("Error en handleRemoveBranch:", error);
      llamarDialog("Error en handleRemoveBranch", error.message, true);
    }
  };

  function handleConfirmDelete() {
    handleRemoveBranch(branchToDelete);
  }

  useEffect(() => {
    async function fetchBranches() {
      const respuesta = await fetch(
        window.__APP_CONFIG__.API_URL + "/branches",
      );
      const json = await respuesta.json();
      console.log(json.datos);
      setRows(json.datos);
    }

    fetchBranches();
  }, []);

  return (
    <Grid container sx={{ px: 2, justifyContent: "center" }} spacing={2}>
      <Grid item xs={12} sx={{ pt: 2, justifyItems: "center" }} display="flex">
        <PDFDownloadLink
          document={
            <InformeListadoSucursales
              rows={rows}
              uploadsUrl={window.__APP_CONFIG__.UPLOADS_URL}
            />
          }
          fileName={`informe_sucursales_almacenadas_${new Date().toISOString().split("T")[0]}.pdf`}
          style={{ textDecoration: "none" }}
        >
          {({ loading }) => (
            <Button variant="contained" disabled={loading}>
              {loading
                ? "Preparando documento..."
                : "Descargar PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 5, mb: 1 }}>
        <Table
          sx={{
            minWidth: 650,
            "& th, & td": {
              textAlign: "center",
              verticalAlign: "middle",
            },
          }}
          aria-label="branches table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>Nº CAJEROS</TableCell>
              <TableCell>INGRESO MENSUAL (€)</TableCell>
              <TableCell>FECHA APERTURA</TableCell>
              <TableCell>¿ABIERTA?</TableCell>
              <TableCell>BANCO</TableCell>
              <TableCell>ACCIONES</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: "background.default" }}>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.n_tellers}</TableCell>
                <TableCell>{row.monthly_income}</TableCell>
                <TableCell>{row.opening_date}</TableCell>
                <TableCell>{row.open ? "Abierta" : "Cerrada"}</TableCell>
                <TableCell>{row.id_bank_bank.name}</TableCell>

                <TableCell>
                  <IconButton
                    aria-label="edit"
                    size="large"
                    color="primary"
                    component={Link}
                    to={"/modificacionsucursal/" + row.id}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => {
                      setBranchToDelete(row.id);
                      setOpenConfirmDialog(true);
                    }}
                    color="error"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EventDialog
        title={dialogTitle}
        descriptionEvent={dialogDescription}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        onCancel={() => setOpenConfirmDialog(false)}
        onConfirm={() => {
          handleConfirmDelete();
          setOpenConfirmDialog(false);
        }}
      />
    </Grid>
  );
}
