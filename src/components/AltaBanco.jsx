import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from '@mui/material/Button';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import Stack from '@mui/material/Stack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


function AltaBanco() {
  const [bankActiveStatus, setBankActiveStatus] = useState(true);
  const [bankCapital, setBankCapital] = useState("");
  const [empNumber, setEmpNumber] = useState("");
  const [foundationDate, setFoundationDate] = useState("");
  const [bankName, setBankName] = useState("");

  function handleCapitalVal(valorAct) {
    const trimmed = valorAct.trim();

    if (trimmed === "") {
      setBankCapital("");
      return;
    }

    const valorActFlt = parseFloat(trimmed);

    if (isNaN(valorActFlt)) return;

    setBankCapital(valorActFlt < 0 ? 0 : valorActFlt);
  }

  function handleEmpNumberVal(empNumber) {
    const trimmed = empNumber.trim();

    if (trimmed === "") {
      setEmpNumber("");
      return;
    }

    const valorActInt = parseInt(trimmed);

    if (isNaN(valorActInt)) return;

    setEmpNumber(valorActInt < 0 ? 0 : valorActInt);
  }

  function cleanInputs(){
    setBankActiveStatus(true)
    setBankCapital("")
    setBankName("")
    setEmpNumber("")
    setFoundationDate("")
  }

  return (
    <Container>
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h5">
        Alta de banco
      </Typography>

      <Box
        sx={{ mb: 3, gap: 2, display: "flex", justifyContent: "space-between" }}
      >
        <TextField
          id="bank-name"
          sx={{ width: "100%" }}
          label="Nombre del banco"
          variant="filled"
          required
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />

        <TextField
          id="emp-number"
          sx={{ width: "100%" }}
          label="Número de empleados"
          variant="filled"
          value={empNumber}
          onChange={(e) => handleEmpNumberVal(e.target.value)}
          required
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextField
          id="initial-cap"
          type="number"
          sx={{ width: "100%" }}
          label="Capital inicial (€)"
          variant="filled"
          value={bankCapital}
          onChange={(e) => handleCapitalVal(e.target.value)}
          slotProps={{ input: { min: 0, step: "0.01" } }}
          required
        />

        <TextField
          variant="filled"
          label="Fecha fundación"
          type="date"
          name="foundation-date"
          id="foundation-date"
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "100%" }}
          value={foundationDate}
          onChange={(e) => setFoundationDate(e.target.value)}
          required
        />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>¿El banco se encuentra activo?</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={bankActiveStatus}
                onChange={(e) => setBankActiveStatus(e.target.checked)}
              />
            }
            label={bankActiveStatus ? "Activo" : "Inactivo"}
          />
        </Box>
      </Box>
      <Box sx={{display: "flex",justifyContent: "space-between", mt: 4}}>
            <Button variant="contained" startIcon={<CleaningServicesIcon />} sx={{color: "black", background: "#c0e9fb"}} onClick={cleanInputs}>
              LIMPIAR CAMPOS
            </Button>
            <Button variant="contained" endIcon={<AccountBalanceIcon />} sx={{color: "black", background: "#c0e9fb"}}>
              DAR DE ALTA AL BANCO
            </Button>
        </Box>
    </Container>
  );
}

export default AltaBanco;
