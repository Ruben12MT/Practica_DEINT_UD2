import { useState } from "react";


export default function useEventDialog() {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("Título");
    const [dialogDescription, setDialogDescripcion] = useState("Descripción");
    
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