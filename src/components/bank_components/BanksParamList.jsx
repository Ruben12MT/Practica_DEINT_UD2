import React, { useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import EventDialog from "../EventDialog";
import useEventDialog from "../../hooks/useEventDialog";
import defaultImg from "../../assets/default.png";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Grid, Button } from "@mui/material";

/**
 * Componente que muestra un listado de bancos filtrado por parámetros.
 * Permite generar un PDF del listado actual utilizando html2canvas y jspdf.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.name - Nombre del banco a filtrar.
 * @param {number|string} props.initial_cap - Capital inicial mínimo.
 * @param {boolean} props.active - Estado de actividad del banco.
 * @returns {JSX.Element} Tabla filtrada y botón de exportación PDF.
 */
export default function BanksParamList(props) {
  const [rows, setRows] = useState([]); // Filas de la tabla
  // Hook personalizado para diálogos
  const {
    openDialog,
    dialogTitle,
    dialogDescription,
    setOpenDialog,
    llamarDialog,
  } = useEventDialog();
  const listRef = useRef(null); // Referencia a la tabla para exportación

  /**
   * Genera un archivo PDF con el contenido de la tabla actual.
   * Clona la tabla, aplica estilos para impresión y compagina si es necesario.
   */
  async function generatePDF() {
    if (!listRef.current) return;
    try {
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasOptions = {
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const tableInClone = clonedDoc.querySelector("table");
          if (tableInClone) {
            tableInClone.style.color = "black";
            tableInClone.style.backgroundColor = "white";
            const allCells = tableInClone.querySelectorAll("td, th, span, p");
            allCells.forEach((cell) => {
              cell.style.color = "black";
            });
          }
        },
      };

      const header = listRef.current.querySelector("thead");
      const canvasHeader = await html2canvas(header, canvasOptions);
      const imgHeader = canvasHeader.toDataURL("image/png");
      const headerHeight =
        (canvasHeader.height * pdfWidth) / canvasHeader.width;

      const rowsElements = listRef.current.querySelectorAll("tbody tr");
      let currentHeight = 20;

      pdf.addImage(imgHeader, "PNG", 0, currentHeight, pdfWidth, headerHeight);
      currentHeight += headerHeight;

      for (const row of rowsElements) {
        const canvasRow = await html2canvas(row, canvasOptions);
        const imgRow = canvasRow.toDataURL("image/png");
        const rowHeight = (canvasRow.height * pdfWidth) / canvasRow.width;

        if (currentHeight + rowHeight > pdfHeight - 15) {
          pdf.addPage();
          currentHeight = 20;

          pdf.addImage(
            imgHeader,
            "PNG",
            0,
            currentHeight,
            pdfWidth,
            headerHeight,
          );
          currentHeight += headerHeight;
        }

        pdf.addImage(imgRow, "PNG", 0, currentHeight, pdfWidth, rowHeight);
        currentHeight += rowHeight;
      }

      pdf.save(`informe_bancos_filtrado.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  }

  useEffect(() => {
    async function fetchBanksByProps() {
      try {
        console.log("Buscando bancos según los parámetros indicados...");
        const res = await fetch(
          window.__APP_CONFIG__.API_URL +
          `/banks?name=${props.name}&initial_cap=${props.initial_cap}&active=${props.active}`,
          {
            method: "GET",
          },
        );
        const json = await res.json();
        console.log("Respuesta:", json);

        if (!json.ok) {
          llamarDialog("Error al buscar bancos", json.mensaje, true);
          return;
        }
        setRows(json.datos);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        llamarDialog("Error inesperado", error.message, true);
      }
    }

    fetchBanksByProps();
  }, [props.name, props.initial_cap, props.active, llamarDialog]);
  return (
    <>
      <Grid item xs={12} sx={{ pt: 2 }} display="flex">
        <Button variant="contained" onClick={generatePDF}>
          Generar (PDF)
        </Button>
      </Grid>
      <TableContainer ref={listRef} component={Paper} sx={{ mt: 5, mb: 8 }}>
        <Table
          sx={{
            minWidth: 650,
            "& th, & td": {
              textAlign: "center",
              verticalAlign: "middle",
            },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>LOGO</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>NÚMERO DE EMPLEADOS</TableCell>
              <TableCell>CAPITAL INICIAL (€)</TableCell>
              <TableCell>FUNDADO EN</TableCell>
              <TableCell>¿ACTIVO?</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: "background.default" }}>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img
                    src={
                      row.url_image
                        ? window.__APP_CONFIG__.UPLOADS_URL +
                        "/uploads/banks-logos/" +
                        row.url_image
                        : defaultImg
                    }
                    alt="Vista previa"
                    style={{
                      width: 75,
                      height: 75,
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 8,
                    }}
                  />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.n_employees}</TableCell>
                <TableCell>{row.initial_cap}</TableCell>
                <TableCell>{row.foundation}</TableCell>
                <TableCell>{row.active ? "Activo" : "Inactivo"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EventDialog
        title={dialogTitle}
        descriptionEvent={dialogDescription}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
