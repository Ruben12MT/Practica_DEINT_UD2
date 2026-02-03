import React, { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Grid, Button } from "@mui/material";
import { useThemeStore } from "../../store/useThemeStore";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function BranchGraph() {
  const [data, setData] = useState([]);
  const darkMode = useThemeStore((state) => state.darkMode);
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchBranches() {
      const respuesta = await fetch(
        window.__APP_CONFIG__.API_URL + "/branches"
      );
      const json = await respuesta.json();
      console.log(json.datos);
      setData(json.datos);
    }

    fetchBranches();
  }, []);

  async function generatePDF() {
    if (!chartRef.current) return;
    try {
      const canvas = await html2canvas(chartRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      let imgWidth = pdfWidth;
      let imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (imgHeight > pdfHeight) {
        const ratio = pdfHeight / imgHeight;
        imgHeight = pdfHeight;
        imgWidth = imgWidth * ratio;
      }

      const marginX = (pdfWidth - imgWidth) / 2;
      const marginY = 10;

      pdf.addImage(imgData, "PNG", marginX, marginY, imgWidth, imgHeight);
      const fecha = new Date().toISOString().split('T')[0];
      pdf.save(`informe_sucursales_${fecha}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  }

  return (
    <Grid container spacing={2}  justifyContent="center">
      <Grid item xs={12} sx={{pt: 2}} display="flex">
        <Button variant="contained"  onClick={generatePDF}>Generar (PDF)</Button>
      </Grid>

      <Grid item xs={12} ref={chartRef} sx={{ width: "100%", height: "500px", background: darkMode ? "#1f1f1f" : "#ffffff" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
            <text
              x="50%"
              y="25"
              fill={darkMode ? "#ffffff" : "#000000"}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Análisis de Ingresos Mensuales por Sucursal
            </text>
            <CartesianGrid />
            <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip contentStyle={{ color: "#000000" }} />
            <Legend verticalAlign="bottom" height={36} />
            <Bar name="Ingresos (€)" dataKey="monthly_income" fill="#31b3cd" />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
}
