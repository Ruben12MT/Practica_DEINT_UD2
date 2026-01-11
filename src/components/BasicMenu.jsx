import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

function BasicMenu({ titulo }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const key = titulo.trim().toLowerCase();

  const rutas = {
    bancos: "banco",
    sucursales: "sucursal",
  };

  const base = rutas[key] || key;

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "text.primary" }}
      >
        {titulo}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx = {{ fontSize: "1rem" }}
        >
        <MenuItem
          component={Link}
          to={`/alta${base}`}
          onClick={handleClose}
        >
          Alta de {key}
        </MenuItem>

        <MenuItem
          component={Link}
          to={`/modificacion${base}`}
          onClick={handleClose}
        >
          Modificación de {key}
        </MenuItem>

        <MenuItem
          component={Link}
          to={`/borrado${base}`}
          onClick={handleClose}
        >
          Borrado de {key}
        </MenuItem>

        <MenuItem
          component={Link}
          to={`/listado${base}`}
          onClick={handleClose}
        >
          Listado de {key}
        </MenuItem>

        <MenuItem
          component={Link}
          to={`/listadoparametrizado${base}`}
          onClick={handleClose}
        >
          Listado parametrizado de {key}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default BasicMenu;
