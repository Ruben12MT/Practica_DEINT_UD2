import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import BanksParamList from "./BanksParamList";

export default function BanksParamListForm() {
  const [bankName, setBankName] = useState("");
  const [bankActiveStatus, setBankActiveStatus] = useState(true);
  const [bankCapital, setBankCapital] = useState("");

  function handleCapitalVal(valorAct) {
    const trimmed = valorAct.trim();
    if (trimmed === "") {
      return setBankCapital("");
    }
    const valorActFlt = parseFloat(trimmed);
    if (!isNaN(valorActFlt)) {
      setBankCapital(valorActFlt < 0 ? 0 : valorActFlt);
    }
  }

  return (
    <Container  >
      <Grid container spacing={3} alignItems="center">
        <Grid size={{ xs: 12, lg: 4 }}>
          <TextField
            label="Nombre del banco"
            variant="filled"
            value={bankName}
            fullWidth
            onChange={(e) => setBankName(e.target.value ? e.target.value : "")}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <TextField
            label="Capital inicial (€)"
            variant="filled"
            fullWidth
            type="number"
            value={bankCapital}
            onChange={(e) => handleCapitalVal(e.target.value)}
            slotProps={{ input: { min: 0, step: "0.01" } }}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ display: "flex" , justifyContent: {xs: "space-between", lg: "center"}, width: "100%"}}>
            <Typography sx={{display: {lg: "none"}}}>¿El banco está activo?</Typography>
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
        </Grid>
      </Grid>
      {/* Mostrar resultado*/}
      <BanksParamList
        name={bankName.trim()}
        initial_cap={bankCapital}
        active={bankActiveStatus}
      />
    </Container>
  );
}
