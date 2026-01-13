import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import BranchesParamList from "./BranchesParamList";

export default function BranchesParamListForm() {
  const [branchName, setBranchName] = useState("");
  const [dateMin, setDateMin] = useState("");
  const [dateMax, setDateMax] = useState("");
  const [idBank, setIdBank] = useState("");

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mx: 4, mb: 3 }}>
        <TextField
          label="Nombre de la sucursal"
          variant="filled"
          sx={{ flex: 1 }}
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
        />

        <TextField
          label="Fecha mínima"
          type="date"
          variant="filled"
          sx={{ flex: 1 }}
          value={dateMin}
          onChange={(e) => setDateMin(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <TextField
          label="Fecha máxima"
          type="date"
          variant="filled"
          sx={{ flex: 1 }}
          value={dateMax}
          onChange={(e) => setDateMax(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <TextField
          label="ID Banco"
          type="number"
          variant="filled"
          sx={{ flex: 1 }}
          value={idBank}
          onChange={(e) => setIdBank(e.target.value)}
        />
      </Box>

      <BranchesParamList
        name={branchName.trim()}
        dateMin={dateMin}
        dateMax={dateMax}
        id_bank={idBank}
      />
    </>
  );
}
