import { useState } from "react";


/**
 * Hook personalizado para gestionar el estado de un diálogo de eventos/mensajes.
 * Proporciona el estado y funciones para controlar la visibilidad y contenido del diálogo.
 * 
 * @returns {Object} Objeto con las propiedades y funciones del diálogo:
 * - openDialog {boolean}: Estado de visibilidad del diálogo.
 * - dialogTitle {string}: Título actual del diálogo.
 * - dialogDescription {string}: Descripción o mensaje del diálogo.
 * - setOpenDialog {function}: Función para actualizar directamente la visibilidad.
 * - llamarDialog {function}: Función para abrir el diálogo con un título y descripción específicos.
 */
export default function useEventDialog() {
    const [openDialog, setOpenDialog] = useState(false); // Estado de apertura
    const [dialogTitle, setDialogTitle] = useState(""); // Estado del título
    const [dialogDescription, setDialogDescripcion] = useState("Descripción"); // Estado de la descripción
    
    /**
     * Abre el diálogo estableciendo su título y descripción.
     * 
     * @param {string} titulo - El título a mostrar en el diálogo.
     * @param {string} descripcion - El mensaje o descripción a mostrar.
     */
    const llamarDialog = (titulo, descripcion) => {
      setDialogTitle(titulo);
      setDialogDescripcion(descripcion);
      setOpenDialog(true);
    };

    return {
        openDialog,
        dialogTitle,
        dialogDescription,
        setOpenDialog,
        llamarDialog,
    }
}