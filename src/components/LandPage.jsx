import React from "react";
import { Typography, Grid, Container, Box, Button } from "@mui/material";
import bancosCarro from "../assets/decoration-images/bancos_carro.png";
import sucursalesCarro from "../assets/decoration-images/sucursales_carro.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function LandPage() {
  return (
    <Container maxWidth="lg" sx={{ mb: 10 }}>
      <Grid
        container
        spacing={4}
        sx={{ mt: 5, mb: 5 }}
        justifyContent="center"
        textAlign="center"
      >
        <Grid item xs={12} md={8}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 2, color: "#8cb0c0" }}
          >
            Gestión de Bancos y Sucursales
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "text.secondary",
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            La forma más eficiente de gestionar bancos y sus sucursales.
            Almacena la información bancos y de sus sucursales de una manera
            rápida y cómoda, procuramos que la experiencia del usuario sea
            satisfactoria a la hora de gestionar la información.
          </Typography>
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Box
            sx={{
              boxShadow: "0px 20px 60px rgba(0,0,0,0.15)",
              borderRadius: "30px",
              overflow: "hidden",
              border: "8px solid white",
            }}
          >
            <div
              id="heroCarousel"
              className="carousel slide"
              data-bs-ride="false"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide-to="0"
                  className="active"
                ></button>
                <button
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide-to="1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide-to="2"
                ></button>
              </div>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={bancosCarro}
                    className="d-block w-100"
                    alt="Gestión de bancos"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={sucursalesCarro}
                    className="d-block w-100"
                    alt="Gestión de sucursale"
                  />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
