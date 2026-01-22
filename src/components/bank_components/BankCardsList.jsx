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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EventDialog from "../EventDialog";
import ConfirmDialog from "../ConfirmDialog";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router";

export default function BankCardsList() {
  const [numPage, setNumPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);

  const handlePagination = (value) => {
    setNumPage(value);
  };

  useEffect(() => {
    async function fetchBanksByPage() {
      const respuesta = await fetch(
        "http://localhost:3000/api/banks/bypage/" + numPage,
      );
      const json = await respuesta.json();
      console.log(json.datos);
      setCards(json.datos.banks);
      setCount(json.datos.count);
    }

    fetchBanksByPage();
  }, [numPage, count]);

  return (
    <Container sx={{ mt: 3, mb: 8 }}>
      <Grid container spacing={3} >
        {cards.map((card) => (
          <Grid key={card.id}  size={{xs: 6, lg: 4}} justifyItems="center">
            <Card sx={{ maxWidth: 345, border: "white solid 2px"}} > 
              <CardHeader
                title={card.name}
                subheader={"Se fundó el: " + card.foundation + "."}
              />
              <CardMedia
                component="img"
                height="200"
                image={
                  card.url_image
                    ? "../../../public/banks-logos/" + card.url_image
                    : "../../../public/default.png"
                }
                alt="Imagen del banco"
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  - Inició con un capital de {card.initial_cap}€.
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {"- "+card.n_employees} fueron contratados.
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
      <Box sx={{mt: 3, mb: 10, justifyItems: "right" }}>
        <ControlPagination
          count={Math.ceil(count / 10)}
          handlePagination={handlePagination}
        ></ControlPagination>
      </Box>
    </Container>
  );
}
