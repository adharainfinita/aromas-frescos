import React, { useState } from "react";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { postProduct } from "../services/productsServices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const FormCreateProduct: React.FC = () => {
    const products = useSelector(
        (state: RootState) => state.products.originalCopy
    );

    const categories = Array.from(new Set(products.map((p) => p.product_category)));
    const [productName, setProductName] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productAvailable, setProductAvailable] = useState(false);
    const [productStock, setProductStock] = useState(0);
    const [isCustomCategory, setIsCustomCategory] = useState(false); // Alterna entre selector e input
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newProduct = {
            name: productName,
            brand: productBrand,
            category: productCategory,
            price: productPrice,
            available: productAvailable,
            stock: productStock,
        };

        try {
            await postProduct(newProduct);
            Swal.fire("Éxito", "Producto creado correctamente", "success");
            navigate("/"); // Redirige al dashboard u otra vista tras crear el producto
        } catch (error: any) {
            Swal.fire({
                title: "Error!",
                text: error,
                icon: "error",
                confirmButtonText: "Continuar",
            });
        }
    };

    return (
        <div
            style={{
                background: "#ADD899",
                margin: "3%",
                borderRadius: "3%",
                padding: "3%",
            }}
        >
            <Button
                variant="contained"
                size="large"
                color="inherit"
                onClick={() => {
                    navigate("/");
                }}
            >
                🔙
            </Button>

            <Typography variant="h4" gutterBottom>
                Crear Nuevo Producto
            </Typography>
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

                {isCustomCategory ? (
                    <TextField
                        label="Categoría del Producto"
                        fullWidth
                        margin="normal"
                        value={productCategory}
                        onChange={(event) => setProductCategory(event.target.value)}
                        required
                    />
                ) : (
                    <>
                        <InputLabel>Categoría del Producto</InputLabel>
                        <Select
                            value={productCategory}
                            onChange={(event: SelectChangeEvent<string>) =>
                                setProductCategory(event.target.value)
                            }
                            fullWidth
                            required
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </>
                )}
                <Button
                    variant="outlined"
                    onClick={() => setIsCustomCategory(!isCustomCategory)}
                    style={{ margin: "10px 0" }}
                >
                    {isCustomCategory ? "Elegir de la Lista" : "Crear Nueva Categoría"}
                </Button>

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
                <TextField
                    label="Cantidad en Stock"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={productStock}
                    onChange={(event) => setProductStock(Number(event.target.value))}
                    required
                />
                <Button variant="contained" color="secondary" type="submit">
                    Crear Producto
                </Button>
            </form>
        </div>
    );
};

export default FormCreateProduct;
