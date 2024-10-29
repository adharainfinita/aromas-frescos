import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../services/productsServices";
import { getAllCustomers } from "../services/customersService";
import { getAllPurchases } from "../services/purchasesServices";
import { getProducts } from "../redux/features/productsSlice";
import { getCustomers } from "../redux/features/clientsSlice";
import { getPurchases } from "../redux/features/purchaseSlice";
import { CircularProgress, Typography } from "@mui/material";

const Loading: React.FC = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchProductsAndClients = async () => {
			try {
				const responseProduct = await getAllProducts();
				const responseCustomer = await getAllCustomers();
				const resposnePurchase = await getAllPurchases();
				if (responseProduct) {
					dispatch(getProducts(responseProduct));
				}
				if (responseCustomer) {
					dispatch(getCustomers(responseCustomer));
				}
				if (resposnePurchase) {
					dispatch(getPurchases(resposnePurchase));
				}
			} catch (error) {
				console.error("Error al obtener los productos o clientes:", error);
			}
		};

		fetchProductsAndClients();
	}, [dispatch]);
	setTimeout(() => navigate("/dashboard"), 1000);

	return (
		<div>
			<Typography variant="h4">Cargando...🪶🌺🔄🤗</Typography>
			<CircularProgress color="secondary"/>
		</div>
	);
};

export default Loading;
