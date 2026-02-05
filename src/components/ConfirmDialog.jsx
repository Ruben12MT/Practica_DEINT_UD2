import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

/**
 * Componente de diálogo de confirmación genérico.
 * Muestra un título, un mensaje y botones para cancelar o confirmar una acción.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.open - Controla si el diálogo está visible.
 * @param {string} [props.title="Confirmar acción"] - Título del diálogo.
 * @param {string} [props.message="¿Estás seguro de que quieres continuar?"] - Mensaje del cuerpo del diálogo.
 * @param {function} props.onCancel - Función a ejecutar al cancelar o cerrar el diálogo.
 * @param {function} props.onConfirm - Función a ejecutar al confirmar la acción.
 * @returns {JSX.Element} Un diálogo modal de confirmación.
 */
export default function ConfirmDialog({
  open,
  title = "Confirmar acción",
  message = "¿Estás seguro de que quieres continuar?",
  onCancel,
  onConfirm
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
