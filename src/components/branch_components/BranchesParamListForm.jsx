import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import BranchesParamList from "./BranchesParamList";
import BanksSelect from "../bank_components/BanksSelect";

export default function BranchesParamListForm() {
  const [branchName, setBranchName] = useState("");
  const [dateMin, setDateMin] = useState("");
  const [dateMax, setDateMax] = useState("");
  const [idBank, setIdBank] = useState("");

  return (
    <Container maxWidth="100%" sx={{ pt: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <TextField
            label="Nombre de la sucursal"
            variant="filled"
            sx={{ flex: 1 }}
            value={branchName}
            fullWidth
            onChange={(e) => setBranchName(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          <TextField
            label="Fecha mínima"
            type="date"
            variant="filled"
            sx={{ flex: 1 }}
            fullWidth
            value={dateMin}
            onChange={(e) => setDateMin(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <TextField
            label="Fecha máxima"
            type="date"
            variant="filled"
            sx={{ flex: 1 }}
            fullWidth
            value={dateMax}
            onChange={(e) => setDateMax(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <BanksSelect onChange={(e) => setIdBank(e.target.value)} />
        </Grid>
      </Grid>
      <BranchesParamList
        name={branchName.trim()}
        dateMin={dateMin}
        dateMax={dateMax}
        id_bank={idBank}
      />
    </Container>
  );
}
