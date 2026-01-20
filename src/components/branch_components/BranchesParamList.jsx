import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EventDialog from "../EventDialog";
import useEventDialog from "../../hooks/useEventDialog";

export default function BranchesParamList(props) {
  const [rows, setRows] = useState([]);
  const {
    openDialog,
    dialogTitle,
    dialogDescription,
    setOpenDialog,
    llamarDialog,
  } = useEventDialog();

  useEffect(() => {
    async function fetchBranchesByProps() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/branches/filter?name=${props.name}&dateMin=${props.dateMin}&dateMax=${props.dateMax}&id_bank=${props.id_bank}`,
          {
            method: "GET",
          },
        );

        const json = await res.json();
        if (!json.ok) {
          llamarDialog("Error al buscar sucursales", json.mensaje);
          return;
        }

        setRows(json.datos);
      } catch (error) {
        llamarDialog("Error inesperado", error.message);
      }
    }

    fetchBranchesByProps();
  }, [props.name, props.dateMin, props.dateMax, props.id_bank]);

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5, mb: 8 }}>
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
              <TableCell>ID BANCO</TableCell>
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
                <TableCell>{row.id_bank}</TableCell>
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
    </>
  );
}
