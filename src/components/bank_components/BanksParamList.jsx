import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import EventDialog from "../EventDialog";
import useEventDialog from "../../hooks/useEventDialog";

export default function BanksParamList(props) {
  const [rows, setRows] = useState([]);
  const {
    openDialog,
    dialogTitle,
    dialogDescription,
    setOpenDialog,
    llamarDialog,
  } = useEventDialog();

  useEffect(() => {
    async function fetchBanksByProps() {
      try {
        console.log("Buscando bancos según los parámetros indicados...");
        const res = await fetch(
          `http://localhost:3000/api/banks?name=${props.name}&initial_cap=${props.initial_cap}&active=${props.active}`,
          {
            method: "GET",
          },
        );
        const json = await res.json();
        console.log("Respuesta:", json);

        if (!json.ok) {
          llamarDialog("Error al buscar bancos", json.mensaje, true);
          return;
        }
        //Si todo va bien, actualizamos la tabla
        setRows(json.datos);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        llamarDialog("Error inesperado", error.message, true);
      }
    }

    fetchBanksByProps();
  }, [props.name, props.initial_cap, props.active]);
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
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>LOGO</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>NÚMERO DE EMPLEADOS</TableCell>
              <TableCell>CAPITAL INICIAL (€)</TableCell>
              <TableCell>FUNDADO EN</TableCell>
              <TableCell>¿ACTIVO?</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: "background.default" }}>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img
                    src={
                      row.url_image
                        ? "../../public/banks-logos/" + row.url_image
                        : "../../public/default.png"
                    }
                    alt="Vista previa"
                    style={{
                      width: 75,
                      height: 75,
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 8,
                    }}
                  />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.n_employees}</TableCell>
                <TableCell>{row.initial_cap}</TableCell>
                <TableCell>{row.foundation}</TableCell>
                <TableCell>{row.active ? "Activo" : "Inactivo"}</TableCell>
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
