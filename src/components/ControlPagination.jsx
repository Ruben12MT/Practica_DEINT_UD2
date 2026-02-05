import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

/**
 * Componente para controlar la paginación de listados.
 * Muestra la página actual y botones para navegar entre páginas.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.count - Número total de páginas disponibles.
 * @param {function(number): void} props.handlePagination - Función que maneja el cambio de página. Recibe el nuevo número de página.
 * @returns {JSX.Element} Componente de paginación.
 */
export default function ControlPagination({ count, handlePagination }) {
  const [page, setPage] = React.useState(1); // Estado para la página actual

  /**
   * Maneja el evento de cambio de página.
   * Actualiza el estado local y llama a la función proporcionada por el padre.
   * @param {object} event - Evento del cambio.
   * @param {number} value - Nuevo número de página seleccionado.
   */
  const handleChange = (event, value) => {
    setPage(value);
    handlePagination(value)
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}
