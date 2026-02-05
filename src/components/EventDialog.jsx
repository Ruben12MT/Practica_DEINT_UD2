import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

// Transición para el diálogo (deslizamiento hacia arriba)
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Componente de diálogo para mostrar información o eventos.
 * Utiliza una transición deslizante para aparecer.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.title - Título del diálogo.
 * @param {string} props.descriptionEvent - Descripción o cuerpo del mensaje.
 * @param {boolean} props.openDialog - Estado que controla la visibilidad.
 * @param {function(boolean): void} props.setOpenDialog - Función para actualizar el estado de visibilidad.
 * @returns {JSX.Element} Un diálogo informativo.
 */
export default function EventDialog({
  title,
  descriptionEvent,
  openDialog,
  setOpenDialog,
}) {
  /**
   * Cierra el diálogo actualizando el estado.
   */
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ color: "text.primary", background: "backgroundColor.paper" }}
        disableEnforceFocus={false}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {descriptionEvent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Entendido</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
