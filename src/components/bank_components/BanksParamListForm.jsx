import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
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
    <>
      <Box sx={{ display: "flex", gap: 2, mx: 4, mb: 3 }}>
        <TextField
          label="Nombre del banco"
          variant="filled"
          sx={{ flex: 1 }}
          value={bankName}
          onChange={(e) => setBankName(e.target.value ? e.target.value : "")}
        />

        <TextField
          label="Capital inicial (€)"
          variant="filled"
          type="number"
          sx={{ flex: 1 }}
          value={bankCapital}
          onChange={(e) => handleCapitalVal(e.target.value)}
          slotProps={{ input: { min: 0, step: "0.01" } }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={bankActiveStatus}
              onChange={(e) => setBankActiveStatus(e.target.checked)}
            />
          }
          label={bankActiveStatus ? "Activo" : "Inactivo"}
          sx={{ alignSelf: "center" }}
        />
      </Box>

      {/* Mostrar resultado*/}
      <BanksParamList
        name={bankName.trim()}
        initial_cap={bankCapital}
        active={bankActiveStatus}
      />
    </>
  );
}
