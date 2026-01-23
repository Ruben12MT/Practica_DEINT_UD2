import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BanksSelect({ value, onChange, error }) {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    async function fetchBanks() {
      const respuesta = await fetch("http://localhost:3000/api/banks");
      const json = await respuesta.json();
      console.log(json.datos);
      setBanks(json.datos);
    }

    fetchBanks();
  }, []);

  function handleChange(e) {
    onChange(e);
  }

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Bancos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value ?? ""}
          onChange={handleChange}
          variant="filled"
          error={error}
          defaultChecked
        >

          {banks.map((banco) => (
            <MenuItem key={banco.id} value={banco.id}>
              {banco.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
