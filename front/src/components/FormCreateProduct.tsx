import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { postProduct } from "../services/productsServices";
import { useNavigate } from "react-router-dom";

const FormCreateProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productAvailable, setProductAvailable] = useState(false);
  const navigate = useNavigate();

  console.log(productAvailable);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newProduct = {
      name: productName,
      brand: productBrand,
      category: productCategory,
      price: productPrice,
      available: productAvailable ? true : false,
    };

    try {
      await postProduct(newProduct);
      alert("Producto creado con éxito");
      navigate("/"); // Redirige al dashboard u otra vista tras crear el producto
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Error al crear el producto");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Crear Nuevo Producto</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Producto"
          fullWidth
          margin="normal"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          required
        />
        <TextField
          label="Marca del Producto"
          fullWidth
          margin="normal"
          value={productBrand}
          onChange={(event) => setProductBrand(event.target.value)}
          required
        />
        <TextField
          label="Categoría del Producto"
          fullWidth
          margin="normal"
          value={productCategory}
          onChange={(event) => setProductCategory(event.target.value)}
          required
        />
        <TextField
          label="Precio del Producto"
          type="number"
          fullWidth
          margin="normal"
          value={productPrice}
          onChange={(event) => setProductPrice(Number(event.target.value))}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={productAvailable}
              onChange={(event) => setProductAvailable(event.target.checked)}
            />
          }
          label="Disponible"
        />
        <Button variant="contained" color="primary" type="submit">
          Crear Producto
        </Button>
      </form>
    </div>
  );
};

export default FormCreateProduct;
