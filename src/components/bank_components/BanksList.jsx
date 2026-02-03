import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ControlPagination from "../ControlPagination";
import defaultImg from "../../assets/default.png";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EventDialog from "../EventDialog";
import ConfirmDialog from "../ConfirmDialog";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router";

export default function BanksList() {
  const [numPage, setNumPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Titulo");
  const [dialogDescription, setDialogDescripcion] = useState("Descripcion");

  function llamarDialog(titulo, descripcion, abrir) {
    setDialogTitle(titulo);
    setDialogDescripcion(descripcion);
    setOpenDialog(abrir);
  }

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(-1);

  const handlePagination = (value) => {
    setNumPage(value);
  };

  function handleConfirmDelete() {
    handleRemoveBank(bankToDelete);
  }

  const handleRemoveBank = async (id) => {
    try {
      const respuesta = await fetch(
        window.__APP_CONFIG__.API_URL + "/banks/" + id,
        {
          method: "DELETE",
        },
      );

      const oJson = await respuesta.json();
      console.log(oJson);

      llamarDialog(
        oJson.ok ? "Banco borrado" : "No se puede borrar el banco",
        oJson.mensaje,
        true,
      );

      if (oJson.ok) {
        setCount(count - 1);
      }
    } catch (error) {
      console.error("Error en handleRemoveBank:", error);
      llamarDialog("Error en handleRemoveBank", error.message, true);
    }
  };

  useEffect(() => {
    async function fetchBanksByPage() {
      const respuesta = await fetch(
        window.__APP_CONFIG__.API_URL + "/banks/bypage/" + numPage,
      );
      const json = await respuesta.json();
      console.log(json.datos);
      setRows(json.datos.banks);
      setCount(json.datos.count);
    }

    fetchBanksByPage();
  }, [numPage, count]);

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5, mb: 1 }}>
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
              <TableCell>ACCIONES</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: "background.default" }}>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img
                    src={
                      row.url_image
                        ? window.__APP_CONFIG__.UPLOADS_URL +
                          "/uploads/banks-logos/" +
                          row.url_image
                        : defaultImg
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

                <TableCell>
                  <IconButton
                    aria-label="edit"
                    size="large"
                    color="primary"
                    component={Link}
                    to={"/modificacionbanco/" + row.id}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => {
                      setBankToDelete(row.id);
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
      <Box sx={{ mb: 10, justifyItems: "right" }}>
        <ControlPagination
          count={Math.ceil(count / 10)}
          handlePagination={handlePagination}
        ></ControlPagination>
      </Box>
      <EventDialog
        title={dialogTitle}
        descriptionEvent={dialogDescription}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      ></EventDialog>
      <ConfirmDialog
        open={openConfirmDialog}
        onCancel={() => setOpenConfirmDialog(false)}
        onConfirm={() => {
          handleConfirmDelete();
          setOpenConfirmDialog(false);
        }}
      />
    </>
  );
}
