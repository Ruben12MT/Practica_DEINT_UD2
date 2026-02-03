import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 80 },

  { field: "name", headerName: "Nombre", minWidth: 150, flex: 1 },

  { field: "n_employees", headerName: "Empleados", type: "number", minWidth: 120, flex: 1, align: "right" },

  { field: "initial_cap", headerName: "Capital inicial (€)", type: "number", minWidth: 150, flex: 1, align: "right" },

  { field: "foundation", headerName: "Fundado en", minWidth: 150, flex: 1 },

  { field: "active", headerName: "Activo", type: "boolean", width: 120 },

  { field: "url_image", headerName: "Logo", minWidth: 150, flex: 1 },
];


export default function DataGridBank() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchBanks() {
      const res = await fetch( window.__APP_CONFIG__.API_URL+"/banks");
      const json = await res.json();
      setRows(json.datos);
    }
    fetchBanks();
  }, []);

  return (
    
    <Box sx={{ height: "100%", width: "100%", mt: 5 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
            backgroundColor: "background.default",
        }}
      />
    </Box>
  );
}
