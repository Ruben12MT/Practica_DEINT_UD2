import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EventDialog from "../EventDialog";

function FormBranch({ branchToEdit = null }) {
  const [branchName, setBranchName] = useState("");
  const [nTellers, setNTellers] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [branchOpenStatus, setBranchOpenStatus] = useState(true);
  const [idBank, setIdBank] = useState("");

  const [validateInputsObj, setValidateInputsObj] = useState({
    name: true,
    tellers: true,
    income: true,
    date: true,
    bankId: true,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Título");
  const [dialogDescription, setDialogDescripcion] = useState("Descripción");

  useEffect(() => {
    if (branchToEdit) {
      setBranchName(branchToEdit.name);
      setNTellers(branchToEdit.n_tellers);
      setMonthlyIncome(branchToEdit.monthly_income);
      setOpeningDate(branchToEdit.opening_date);
      setBranchOpenStatus(branchToEdit.open);
      setIdBank(branchToEdit.id_bank);
    }
  }, [branchToEdit]);

  function cleanInputs() {
    setBranchName("");
    setNTellers("");
    setMonthlyIncome("");
    setOpeningDate("");
    setBranchOpenStatus(true);
    setIdBank("");
  }

  function llamarDialog(titulo, descripcion, abrir) {
    setDialogTitle(titulo);
    setDialogDescripcion(descripcion);
    setOpenDialog(abrir);
  }

  function validateInputs() {
    const bolName = branchName.trim() !== "";
    const bolTellers = /^\d+$/.test(nTellers);
    const bolIncome = /^\d+(\.\d{0,2})?$/.test(monthlyIncome);
    const bolDate = openingDate.trim() !== "";
    const bolBankId = /^\d+$/.test(idBank);

    setValidateInputsObj({
      name: bolName,
      tellers: bolTellers,
      income: bolIncome,
      date: bolDate,
      bankId: bolBankId,
    });

    return bolName && bolTellers && bolIncome && bolDate && bolBankId;
  }

  async function accionSucursal() {
    const nuevaSucursal = {
      name: branchName,
      n_tellers: parseInt(nTellers),
      monthly_income: parseFloat(monthlyIncome),
      opening_date: openingDate,
      open: branchOpenStatus,
      id_bank: parseInt(idBank),
    };

    try {
      const url = branchToEdit
        ? `http://localhost:3000/api/branches/${branchToEdit.id}`
        : "http://localhost:3000/api/branches";

      const method = branchToEdit ? "PUT" : "POST";

      const respuesta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaSucursal),
      });

      if (!respuesta.ok)
        throw new Error(
          branchToEdit
            ? "Error al modificar la sucursal"
            : "Error al insertar la sucursal"
        );

      const data = await respuesta.json();
      console.log(
        branchToEdit
          ? "Sucursal actualizada correctamente:"
          : "Sucursal insertada correctamente:",
        data
      );

      llamarDialog(
        branchToEdit ? "Sucursal actualizada" : "Sucursal insertada",
        data.mensaje,
        respuesta.ok
      );
    } catch (error) {
      console.error("Error en accionSucursal:", error);
      llamarDialog("Error en accionSucursal", error.message, true);
    }
  }

  return (
    <Container>
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h5">
        {branchToEdit ? "Editar sucursal" : "Alta de sucursal"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Nombre + Nº cajeros */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            error={!validateInputsObj.name}
            label="Nombre de la sucursal"
            variant="filled"
            sx={{ width: "100%" }}
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
          />

          <TextField
            error={!validateInputsObj.tellers}
            label="Número de cajeros"
            variant="filled"
            type="number"
            sx={{ width: "100%" }}
            value={nTellers}
            onChange={(e) => setNTellers(e.target.value)}
            required
          />
        </Box>

        {/* Ingresos + Fecha apertura */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            error={!validateInputsObj.income}
            label="Ingresos mensuales (€)"
            variant="filled"
            type="number"
            sx={{ width: "100%" }}
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            required
          />

          <TextField
            error={!validateInputsObj.date}
            label="Fecha de apertura"
            variant="filled"
            type="date"
            sx={{ width: "100%" }}
            value={openingDate}
            onChange={(e) => setOpeningDate(e.target.value)}
            required
          />
        </Box>

        {/* ID del banco */}
        <TextField
          error={!validateInputsObj.bankId}
          label="ID del banco asociado"
          variant="filled"
          type="number"
          sx={{ width: "100%" }}
          value={idBank}
          onChange={(e) => setIdBank(e.target.value)}
          required
        />

        {/* Switch de estado */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>¿La sucursal está abierta?</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={branchOpenStatus}
                onChange={(e) => setBranchOpenStatus(e.target.checked)}
              />
            }
            label={branchOpenStatus ? "Abierta" : "Cerrada"}
          />
        </Box>

        {/* Botones */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<CleaningServicesIcon />}
            sx={{ color: "text.primary", backgroundColor: "background.paper" }}
            onClick={cleanInputs}
          >
            LIMPIAR CAMPOS
          </Button>

          <Button
            variant="contained"
            endIcon={<AccountBalanceIcon />}
            sx={{ color: "text.primary", backgroundColor: "background.paper" }}
            onClick={async () => {
              if (validateInputs()) await accionSucursal();
              else console.error("Los datos no son válidos");
            }}
          >
            {branchToEdit ? "APLICAR DATOS" : "DAR DE ALTA LA SUCURSAL"}
          </Button>
        </Box>
      </Box>

      <EventDialog
        title={dialogTitle}
        descriptionEvent={dialogDescription}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Container>
  );
}

export default FormBranch;
