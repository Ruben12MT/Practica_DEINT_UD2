import { useState, useCallback } from "react";

/**
 * Hook personalizado para gestionar el estado de un diálogo de mensajes.
 * * @returns {Object} 
 * - openDialog: Boolean que indica si el diálogo está visible.
 * - dialogTitle: String con el título del diálogo.
 * - dialogDescription: String con el cuerpo del mensaje.
 * - setOpenDialog: Función para cerrar/abrir manualmente.
 * - llamarDialog: Función ESTABLE para configurar y abrir el diálogo.
 */
export default function useEventDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("Descripción");

  /**
   * Configura y abre el diálogo.
   * Memorizada con useCallback para evitar re-renderizados infinitos.
   */
  const llamarDialog = useCallback((titulo, descripcion) => {
    setDialogTitle(titulo);
    setDialogDescription(descripcion);
    setOpenDialog(true);
  }, []); // Dependencias vacías: la función no cambia nunca.

  return {
    openDialog,
    dialogTitle,
    dialogDescription,
    setOpenDialog,
    llamarDialog,
  };
}