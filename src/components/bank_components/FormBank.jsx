import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Dialog,
} from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InputImage from "../InputImage";
import EventDialog from "../EventDialog";
import useEventDialog  from "../../hooks/useEventDialog";


function FormBank({ bankToEdit = null }) {
 
  const [empNumber, setEmpNumber] = useState("");
  const [foundationDate, setFoundationDate] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankActiveStatus, setBankActiveStatus] = useState(true);
  const [bankCapital, setBankCapital] = useState("");
  const [validateInputsObj, setValidateInputsObj] = useState({
    name: true,
    empNumber: true,
    capital: true,
    fDate: true,
  });
  const {
  openDialog,
  dialogTitle,
  dialogDescription,
  setOpenDialog,
  llamarDialog,
  } = useEventDialog();

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("../../public/default.png");

  

  useEffect(() => {
    if (bankToEdit) {
      setBankActiveStatus(bankToEdit.active);
      setBankCapital(bankToEdit.initial_cap);
      setEmpNumber(bankToEdit.n_employees);
      setFoundationDate(bankToEdit.foundation);
      setBankName(bankToEdit.name);
      setPreviewUrl(bankToEdit.url_image ?"../../public/banks-logos/"+bankToEdit.url_image : "../../public/default.png");
    }
  }, [bankToEdit]);

  function handleCapitalVal(valorAct) {
    const trimmed = valorAct.trim();
    if (trimmed === "") return setBankCapital("");
    const valorActFlt = parseFloat(trimmed);
    if (!isNaN(valorActFlt)) setBankCapital(valorActFlt < 0 ? 0 : valorActFlt);
  }

  function handleEmpNumberVal(empNumber) {
    const trimmed = empNumber.trim();
    if (trimmed === "") return setEmpNumber("");
    const valorActInt = parseInt(trimmed);
    if (!isNaN(valorActInt)) setEmpNumber(valorActInt < 0 ? 0 : valorActInt);
  }

  function cleanInputs() {
    setBankActiveStatus(true);
    setBankCapital("");
    setBankName("");
    setEmpNumber("");
    setFoundationDate("");
    setImageFile(null);
    setPreviewUrl("../../public/default.png");
  }


  function validateInputs() {
    const bolName = bankName.trim() !== "";
    const bolCapital = /^\d+(\.\d{0,2})?$/.test(bankCapital);
    const bolEmpNumber = empNumber !== "";
    const bolFoundationDate = foundationDate.trim() !== "";

    setValidateInputsObj({
      name: bolName,
      capital: bolCapital,
      empNumber: bolEmpNumber,
      fDate: bolFoundationDate,
    });

    return bolName && bolCapital && bolEmpNumber && bolFoundationDate;
  }

  async function accionBanco() {
    const nuevoBanco = {
      name: bankName,
      n_employees: empNumber,
      initial_cap: bankCapital,
      foundation: foundationDate,
      active: bankActiveStatus,
    };

    try {
      const respuesta = await fetch(bankToEdit ? "http://localhost:3000/api/banks/"+bankToEdit.id: "http://localhost:3000/api/banks", {
        method: bankToEdit ? "PUT":"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoBanco),
      });

      if (!respuesta.ok) throw new Error(bankToEdit ? "Error al modificar el banco" : "Error al insertar el banco");
      const data = await respuesta.json();
      console.log(bankToEdit ? "Banco actualizado correctamente:" :"Banco insertado correctamente:", data);
      
      if (respuesta.ok) llamarDialog(bankToEdit ? "Banco actualizado" :"Banco insertado", data.mensaje);

      const idBank = bankToEdit ? bankToEdit.id : data.id;

      const formData = new FormData();
      if (imageFile != null) {
        formData.append("logo", imageFile);

        await fetch("http://localhost:3000/api/banks/upload-logo/" + idBank, {
          method: "POST",
          body: formData,
        });
      }
    } catch (error) {
      console.error("Error en accionBanco:", error);
      llamarDialog("Error en accionBanco", error.message);
    }
  }

  const handleFileSelect = (image) => {
    if (!image) {
      setImageFile(null);
      setPreviewUrl("/assets/default.png");
      return;
    }

    setImageFile(image);
    setPreviewUrl(URL.createObjectURL(image));
  };

  return (
    <Container>
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h5">
        {bankToEdit ? "Editar banco" : "Alta de banco"}
      </Typography>

      {/* CONTENEDOR PRINCIPAL */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* BLOQUE 1 — Nombre + empleados */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            error={!validateInputsObj.name}
            label="Nombre del banco"
            variant="filled"
            sx={{ width: "100%" }}
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />

          <TextField
            error={!validateInputsObj.empNumber}
            label="Número de empleados"
            variant="filled"
            sx={{ width: "100%" }}
            value={empNumber}
            onChange={(e) => handleEmpNumberVal(e.target.value)}
            required
          />
        </Box>

        {/* Capital y fecha */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            error={!validateInputsObj.capital}
            label="Capital inicial (€)"
            variant="filled"
            type="number"
            sx={{ width: "100%" }}
            value={bankCapital}
            onChange={(e) => handleCapitalVal(e.target.value)}
            slotProps={{ input: { min: 0, step: "0.01" } }}
            required
          />

          <TextField
            error={!validateInputsObj.fDate}
            label="Fecha fundación"
            variant="filled"
            type="date"
            sx={{ width: "100%" }}
            value={foundationDate}
            onChange={(e) => setFoundationDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            required
          />
        </Box>

        {/*Switch */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>¿El banco se encuentra activo?</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={bankActiveStatus}
                onChange={(e) => setBankActiveStatus(e.target.checked)}
              />
            }
            label={bankActiveStatus ? "Activo" : "Inactivo"}
          />
        </Box>

        {/* Imagen */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <InputImage onImageSelected={handleFileSelect} />

          <img
            src={previewUrl}
            alt="Vista previa"
            style={{
              width: 200,
              height: 200,
              marginTop: 20,
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: 8,
            }}
          />
        </Box>

        {/* BLOQUE 5 — Botones */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<CleaningServicesIcon />}
            sx={{ color: "text.primary", backgroundColor: "background.paper" }}
            onClick={cleanInputs}
          >
            LIMPIAR CAMPOS
          </Button>

          <Button
            variant="contained"
            endIcon={<AccountBalanceIcon />}
            sx={{ color: "text.primary", backgroundColor: "background.paper" }}
            onClick={async () => {
              if (validateInputs()) await accionBanco();
              else console.error("Los datos no son válidos");
            }}
          >
            {bankToEdit ? "APLICAR DATOS" : "DAR DE ALTA AL BANCO"}
          </Button>
        </Box>
      </Box>

      <EventDialog
        title={dialogTitle}
        descriptionEvent={dialogDescription}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      ></EventDialog>
    </Container>
  );
}

export default FormBank;
