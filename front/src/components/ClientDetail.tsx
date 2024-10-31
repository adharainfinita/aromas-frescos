import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { setCustomerDetail } from "../redux/features/clientsSlice";
import { Button, TextField, Typography, Box } from "@mui/material";
import { ICustomerEditForm } from "../interfaces/customer";
import { updateCustomer } from "../services/customersService";

const ClientDetail = () => {
	const { id } = useParams<{ id: string }>(); // Captura el id del cliente
	const dispatch = useDispatch();
	const customers = useSelector((state: RootState) => state.clients.customers);
	const clientDetail = useSelector((state: RootState) => state.clients.detail);
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const [editableCustomer, setEditableCustomer] = useState<ICustomerEditForm>({
		name: clientDetail?.customer_name,
		email: clientDetail?.customer_email,
		phone: clientDetail?.customer_phone,
	});

	useEffect(() => {
		// Convierte id a número y busca el cliente en el array
		const clientFound = customers.find(
			(customer) => customer.customer_id === Number(id)
		);
		// Almacena el cliente encontrado en el estado 'detail'
		dispatch(setCustomerDetail(clientFound || null));
	}, [dispatch, id, customers]);

	useEffect(() => {
		setEditableCustomer({
			name: clientDetail?.customer_name,
			email: clientDetail?.customer_email,
			phone: clientDetail?.customer_phone,
		});
	}, [clientDetail]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setEditableCustomer((prevCustomer) => ({
			...prevCustomer,
			[name]: value,
		}));
	};

	const handleSave = async () => {
		if (editableCustomer) {
			try {
				await updateCustomer(editableCustomer, Number(id));
				setIsEditing(false);
				navigate("/");
			} catch (error) {
				console.log("Error al actualizar el cliente: ", error);
			}
		}
	};

	if (!clientDetail) {
		return <Typography>No se encontró el cliente</Typography>;
	}

	return (
		<Box sx={{ p: 2, backgroundColor: "#6c3483", borderRadius: "4px" }}>
			<Button
				variant="contained"
				size="large"
				onClick={() => {
					navigate("/");
				}}
			>
				🔙
			</Button>
			<Typography variant="h4" color="#DAF7A6" gutterBottom>
				Detalles del Cliente
			</Typography>
			{isEditing ? (
				<>
					<TextField
						label="Nombre"
						name="name"
						value={editableCustomer?.name || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
						sx={{
							"& .MuiInputBase-root": {
								backgroundColor: "#DAF7A6", // Color de fondo
							},
						}}
					/>
					<TextField
						label="Email"
						name="email"
						value={editableCustomer?.email || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
						sx={{
							"& .MuiInputBase-root": {
								backgroundColor: "#DAF7A6", // Color de fondo
							},
						}}
					/>
					<TextField
						label="Teléfono"
						name="phone"
						value={editableCustomer?.phone || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
						sx={{
							"& .MuiInputBase-root": {
								backgroundColor: "#DAF7A6", // Color de fondo
							},
						}}
					/>
					<Button variant="contained" color="primary" onClick={handleSave}>
						Guardar Cambios
					</Button>
				</>
			) : (
				<>
					<Typography variant="body1" color="#DAF7A6">
						Nombre: {clientDetail.customer_name}
					</Typography>
					<Typography variant="body1" color="#DAF7A6">
						Email: {clientDetail.customer_email}
					</Typography>
					<Typography variant="body1" color="#DAF7A6">
						Teléfono: {clientDetail.customer_phone}
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setIsEditing(true)}
					>
						Editar
					</Button>
				</>
			)}
		</Box>
	);
};

export default ClientDetail;
