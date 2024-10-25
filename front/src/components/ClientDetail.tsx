// ClientDetail.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { setCustomerDetail } from "../redux/features/clientsSlice";
import { Typography } from "@mui/material";

const ClientDetail = () => {
	const { id } = useParams<{ id: string }>(); // Captura el id del cliente
	const dispatch = useDispatch();
	const customers = useSelector((state: RootState) => state.clients.customers);
	const clientDetail = useSelector((state: RootState) => state.clients.detail);

	useEffect(() => {
		// Convierte id a número y busca el cliente en el array
		const client = customers.find(
			(customer) => customer.customer_id === Number(id)
		);
		// Almacena el cliente encontrado en el estado 'detail'
		dispatch(setCustomerDetail(client || null));
	}, [dispatch, id, customers]);

	if (!clientDetail) {
		return <Typography>No se encontró el cliente</Typography>;
	}

	return (
		<div>
			<Typography variant="h4">Detalles del Cliente</Typography>
			<Typography variant="body1">
				Nombre: {clientDetail.customer_name}
			</Typography>
			<Typography variant="body1">
				Email: {clientDetail.customer_email}
			</Typography>
			<Typography variant="body1">
				Teléfono: {clientDetail.customer_phone}
			</Typography>
		</div>
	);
};

export default ClientDetail;
