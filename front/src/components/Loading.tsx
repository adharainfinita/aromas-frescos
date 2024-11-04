import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../services/productsServices";
import { getAllCustomers } from "../services/customersService";
import { getAllPurchases } from "../services/purchasesServices";
import { getProducts } from "../redux/features/productsSlice";
import { getCustomers } from "../redux/features/clientsSlice";
import { getPurchases } from "../redux/features/purchaseSlice";
import { Alert, CircularProgress, Typography } from "@mui/material";

const Loading: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Estado para el manejo de errores y estado de carga
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductsAndClients = async () => {
            try {
                const [responseProduct, responseCustomer, responsePurchase] = await Promise.all([
                    getAllProducts(),
                    getAllCustomers(),
                    getAllPurchases()
                ]);
                console.log(responseCustomer, responseProduct);
                
                dispatch(getProducts(responseProduct)); // Se puede despachar un array vacío
                dispatch(getCustomers(responseCustomer));
                dispatch(getPurchases(responsePurchase));

                setIsLoading(false); // Carga completada
            } catch (error: any) {
                console.error("Error en la carga:", error);
                // Solo establece error si es un error que se puede manejar
                setError(error.message || "Ocurrió un error con el servidor. Por favor, intenta de nuevo.");
                setIsLoading(false);
            }
        };

        fetchProductsAndClients();
    }, [dispatch]);

    // Redirigir al dashboard solo cuando la carga está completa
    useEffect(() => {
        if (!isLoading) {
         
                // Redirigir al dashboard si no hay errores
                navigate("/dashboard");
            // Si hay un error, se mostrará en la interfaz sin redirigir
        }
    }, [isLoading, navigate]);

    return (
        <div>
            <Typography variant="h4">Cargando...🪶🌺🔄🤗</Typography>
            {error ? (
                <Alert variant="filled" severity="error">
                    {error}
                </Alert>
            ) : (
                <CircularProgress color="secondary" />
            )}
        </div>
    );
};

export default Loading;
