import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/**
 * Componente select para elegir un banco de la lista disponible.
 * Obtiene los bancos de la API al montarse.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string|number} props.value - Valor seleccionado (ID del banco).
 * @param {function} props.onChange - Función a ejecutar al cambiar la selección.
 * @param {boolean} [props.error] - Indica si hay un error de validación.
 * @returns {JSX.Element} Un selector (dropdown) de bancos.
 */
export default function BanksSelect({ value, onChange, error }) {
  const [banks, setBanks] = useState([]); // Lista de bancos

  // Carga inicial de bancos
  useEffect(() => {
    async function fetchBanks() {
      const respuesta = await fetch(window.__APP_CONFIG__.API_URL + "/banks");
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
