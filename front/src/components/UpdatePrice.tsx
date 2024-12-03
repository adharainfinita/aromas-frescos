import React, { useState } from "react";
import {
    Typography,
    Select,
    MenuItem,
    TextField,
    Button,
    InputLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updatePriceByCategory } from "../services/productsServices";
import Swal from "sweetalert2";

const UpdatePrice: React.FC = () => {
    const products = useSelector(
        (state: RootState) => state.products.originalCopy
    );

    // Lista única de categorías con precios promedio asociados
    const categories = Array.from(
        new Map(products.map((p) => [p.product_category, p.product_price])).entries()
    );

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);
    const [newPrice, setNewPrice] = useState<number | "">("");

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        const categoryPrice = categories.find(([cat]) => cat === category)?.[1] || null;
        setCurrentPrice(categoryPrice);
    };

    const handleSubmit = async () => {
        if (!selectedCategory || !newPrice) {
            Swal.fire("Error", "Debes seleccionar una categoría y asignar un nuevo precio.", "error");
            return;
        }

        try {
            await updatePriceByCategory(Number(newPrice), selectedCategory);
            Swal.fire("Éxito", `El precio de la categoría ${selectedCategory} se actualizó a $${newPrice}`, "success");
            setNewPrice(""); // Limpiar input de nuevo precio
        } catch (error: any) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div style={{ padding: "2%", background: "#f4f4f4", borderRadius: "8px", marginTop: "2%" }}>
            <Typography variant="h5" gutterBottom>
                Actualizar Precios por Categoría
            </Typography>
            <InputLabel>Categoría</InputLabel>
            <Select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                fullWidth
                style={{ marginBottom: "1rem" }}
            >
                {categories.map(([category]) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </Select>
            {currentPrice !== null && (
                <Typography variant="body1" gutterBottom>
                    Precio actual: ${currentPrice}
                </Typography>
            )}
            <TextField
                label="Nuevo Precio"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value ? Number(e.target.value) : "")}
                fullWidth
                style={{ marginBottom: "1rem" }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Actualizar Precio
            </Button>
        </div>
    );
};

export default UpdatePrice;
