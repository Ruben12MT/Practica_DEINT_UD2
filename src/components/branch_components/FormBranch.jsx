import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Grid,
} from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EventDialog from "../EventDialog";
import useEventDialog from "../../hooks/useEventDialog";
import BanksSelect from "../bank_components/BanksSelect";
import { useNavigate } from "react-router";

/**
 * Formulario para crear o editar una sucursal.
 * Maneja la validación de campos como nombre, cajeros, ingresos, fecha y banco asociado.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} [props.branchToEdit=null] - Objeto sucursal si se está editando.
 * @returns {JSX.Element} Formulario de gestión de sucursales.
 */
function FormBranch({ branchToEdit = null }) {
  // Hook de diálogos
  const {
    openDialog,
    dialogTitle,
    dialogDescription,
    setOpenDialog,
    llamarDialog,
  } = useEventDialog();

  // Estados del formulario
  const [branchName, setBranchName] = useState("");
  const [nTellers, setNTellers] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [branchOpenStatus, setBranchOpenStatus] = useState(true);
  const [idBank, setIdBank] = useState("");

  const navigate = useNavigate();

  // Estado de validación
  const [validateInputsObj, setValidateInputsObj] = useState({
    name: true,
    tellers: true,
    income: true,
    date: true,
    bankId: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Cargar datos si es edición
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

  // Manejar cierre de diálogo
  useEffect(() => {
    if (!openDialog && (dialogTitle !== "" || dialogTitle !== "")) {
      if (branchToEdit) {
        navigate("/");
      } else {
        cleanInputs();
      }
    }
  }, [openDialog, dialogTitle, branchToEdit, navigate]);

  /**
   * Limpia el formulario.
   */
  function cleanInputs() {
    setBranchName("");
    setNTellers("");
    setMonthlyIncome("");
    setOpeningDate("");
    setBranchOpenStatus(true);
    setIdBank("");
  }

  /**
   * Valida los campos del formulario.
   * @returns {boolean} true si es válido.
   */
  function validateInputs() {
    const bolName = branchName.trim() !== "";
    const bolTellers = /^\d+$/.test(nTellers);
    const bolIncome = /^\d+(\.\d{0,2})?$/.test(monthlyIncome);
    const bolDate = openingDate.trim() !== "";
    const bolBankId = idBank !== "";

    setValidateInputsObj({
      name: bolName,
      tellers: bolTellers,
      income: bolIncome,
      date: bolDate,
      bankId: bolBankId,
    });

    return bolName && bolTellers && bolIncome && bolDate && bolBankId;
  }

  /**
   * Envía los datos a la API para crear o actualizar la sucursal.
   */
  async function accionSucursal() {

    setIsLoading(true);
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
        ? window.__APP_CONFIG__.API_URL + `/branches/${branchToEdit.id}`
        : window.__APP_CONFIG__.API_URL + "/branches";

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
            : "Error al insertar la sucursal",
        );

      const data = await respuesta.json();
      console.log(
        branchToEdit
          ? "Sucursal actualizada correctamente:"
          : "Sucursal insertada correctamente:",
        data,
      );

      if (respuesta.ok)
        llamarDialog(
          branchToEdit ? "Sucursal actualizada" : "Sucursal insertada",
          data.mensaje,
        );
      cleanInputs();
    } catch (error) {
      console.error("Error en accionSucursal:", error);
      llamarDialog("Error en accionSucursal", error.message);
    } finally {
      setIsLoading(false);

    }
  }

  return (
    <Container sx={{ mt: 4, mb: 10 }}>
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h5">
        {branchToEdit ? "Editar sucursal" : "Alta de sucursal"}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TextField
            error={!validateInputsObj.name}
            label="Nombre de la sucursal"
            variant="filled"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <TextField
            error={!validateInputsObj.tellers}
            label="Número de cajeros"
            variant="filled"
            type="number"
            fullWidth
            value={nTellers}
            onChange={(e) => setNTellers(e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <TextField
            error={!validateInputsObj.income}
            label="Ingresos mensuales (€)"
            variant="filled"
            type="number"
            fullWidth
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <TextField
            error={!validateInputsObj.date}
            label="Fecha de apertura"
            variant="filled"
            type="date"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            value={openingDate}
            onChange={(e) => setOpeningDate(e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <BanksSelect
            value={idBank}
            onChange={(e) => setIdBank(e.target.value)}
            error={!validateInputsObj.bankId}
          />
        </Grid>

        <Grid
          size={{ xs: 12, lg: 6 }}
          container
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
          direction={{ xs: "column", lg: "row" }}
          padding={{ xs: 2, lg: 0 }}
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
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
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<CleaningServicesIcon />}
              sx={{
                color: "primary",
                backgroundColor: "orange",
              }}
              onClick={cleanInputs}
            >
              LIMPIAR CAMPOS
            </Button>
            <Button
              variant="contained"
              endIcon={<AccountBalanceIcon />}
              disabled={isLoading}
              sx={{
                color: "primary",
                backgroundColor: "green",
              }}
              onClick={async () => {
                if (validateInputs()) await accionSucursal();
                else console.error("Los datos no son válidos");
              }}
            >
              {branchToEdit ? "APLICAR DATOS" : "DAR DE ALTA LA SUCURSAL"}
            </Button>
          </Box>
        </Grid>
      </Grid>

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
