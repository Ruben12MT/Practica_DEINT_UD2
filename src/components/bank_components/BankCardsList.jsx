import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ControlPagination from "../ControlPagination";
import defaultImg from "../../assets/default.png";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventDialog from "../EventDialog";
import ConfirmDialog from "../ConfirmDialog";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router";

/**
 * Componente que muestra un listado de bancos en formato de tarjetas (Cards).
 * Incluye paginación y funcionalidad para generar un PDF de la vista actual (aunque `window.print` imprime toda la página).
 * 
 * @returns {JSX.Element} Grid de tarjetas de bancos y controles de paginación.
 */
export default function BankCardsList() {
  const [numPage, setNumPage] = useState(1); // Página actual
  const [cards, setCards] = useState([]); // Datos de las tarjetas
  const [count, setCount] = useState(0); // Total de registros


  const handlePagination = (value) => {
    setNumPage(value);
  };

  useEffect(() => {
    async function fetchBanksByPage() {
      const respuesta = await fetch(
        window.__APP_CONFIG__.API_URL + "/banks/bypage/" + numPage,
      );
      const json = await respuesta.json();
      console.log(json.datos);
      setCards(json.datos.banks);
      setCount(json.datos.count);
    }

    fetchBanksByPage();
  }, [numPage, count]);

  const imprimir = () => {
    window.print();
  };

  return (
    <Container sx={{ mt: 3, mb: 8 }}>
      <Grid sx={{ pb: 3 }}>
        <Button variant="contained" onClick={imprimir}>
          Generar (PDF)
        </Button>
      </Grid>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.id} size={{ xs: 6, lg: 4 }} sx={{ mt: 2, mb: 2 }} justifyItems="center">
            <Card sx={{ maxWidth: 345, border: "white solid 2px" }}>
              <CardHeader
                title={card.name}
                subheader={"Se fundó el: " + card.foundation + "."}
              />
              <CardMedia
                component="img"
                height="200"
                image={
                  card.url_image
                    ? window.__APP_CONFIG__.UPLOADS_URL +
                    "/uploads/banks-logos/" +
                    card.url_image
                    : defaultImg
                }
                alt="Imagen del banco"
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  - Inició con un capital de {card.initial_cap}€.
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {"- " + card.n_employees} fueron contratados.
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {card.active
                    ? "- El banco se encuentra activo."
                    : "- El banco se mantiene inactivo actualmente."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, mb: 10, justifyItems: "right" }}>
        <ControlPagination
          count={Math.ceil(count / 10)}
          handlePagination={handlePagination}
        ></ControlPagination>
      </Box>
    </Container>
  );
}
