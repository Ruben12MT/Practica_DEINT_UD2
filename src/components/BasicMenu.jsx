import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

/**
 * Componente que renderiza un menú desplegable básico.
 * Utiliza los componentes Button y Menu de Material UI.
 * Adapta las rutas de navegación basándose en el título proporcionado ("bancos" o "sucursales").
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.titulo - El título que se mostrará en el botón y determina el contexto ("bancos" o "sucursales").
 * @returns {JSX.Element} Un botón con un menú desplegable.
 */
function BasicMenu({ titulo }) {
  // Estado para controlar el elemento de anclaje del menú
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  /**
   * Maneja el clic en el botón para abrir el menú.
   * @param {React.MouseEvent} event - El evento del clic.
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Cierra el menú estableciendo el anclaje a null.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Normaliza el título para usarlo en la lógica de rutas
  const key = titulo.trim().toLowerCase();

  // Mapeo de claves plurales a singulares para la construcción de URLs
  const rutas = {
    bancos: "banco",
    sucursales: "sucursal",
  };

  // Determina la base de la ruta (singular) o usa la clave original
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
        sx={{ fontSize: "1rem" }}
      >
        <MenuItem component={Link} to={`/alta${base}`} onClick={handleClose}>
          Alta de {key}
        </MenuItem>

        <MenuItem component={Link} to={`/listado${base}`} onClick={handleClose}>
          Listado de {key}
        </MenuItem>

        <MenuItem
          component={Link}
          to={`/listadoparametrizado${base}`}
          onClick={handleClose}
        >
          Listado parametrizado de {key}
        </MenuItem>

        {key === "bancos" && (
          <MenuItem
            component={Link}
            to={`/listado${base}/datagrid`}
            onClick={handleClose}
          >
            DataGrid de {key}
          </MenuItem>
        )}
        {key === "bancos" && (
          <MenuItem
            component={Link}
            to={`/listadocards${base}`}
            onClick={handleClose}
          >
            Listado de cards paginado
          </MenuItem>
        )}

        {key === "sucursales" && (
          <MenuItem
            component={Link}
            to={`/graficasucursales`}
            onClick={handleClose}
          >
            Gráfica de ganancias mensuales de sucursales
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default BasicMenu;
