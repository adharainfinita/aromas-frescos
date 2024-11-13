import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Button } from "@mui/material";

const SliderBar: React.FC =() => {
  return (
<Box
sx={{
  position: "fixed",
  bottom: 16,
  right: 16,
  padding: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1,
}}
>
{/* Contenedor flotante para los botones de navegación con solo iconos */}
<Button
  variant="contained"
  color="primary"
  sx={{ minWidth: "auto", padding: 1 }}
>
  <a href="#clientes" style={{ border: "hidden" }}>
    <AccountCircleIcon />
  </a>
</Button>
<Button
  variant="contained"
  color="primary"
  sx={{ minWidth: "auto", padding: 1 }}
>
  <a href="#productos" style={{ border: "hidden" }}>
    <ListIcon />
  </a>
</Button>
<Button
  variant="contained"
  color="primary"
  sx={{ minWidth: "auto", padding: 1 }}
>
  <a href="#compras" style={{ border: "hidden" }}>
    <StoreIcon />
  </a>
</Button>
</Box>
  )
};

export default SliderBar;