import React, { useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { postCustomer } from "../services/customersService";
import { useNavigate } from "react-router-dom";

const FormCreateCustomer: React.FC = () => {
	const [customerName, setCustomerName] = useState("");
	const [customerPhone, setCustomerPhone] = useState("");
	const [customerEmail, setCustomerEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const newCustomer = {
			name: customerName,
			phone: customerPhone,
			email: customerEmail ? customerEmail : "",
		};

		try {
			await postCustomer(newCustomer);
			<Alert severity="success">Cliente creado con éxito</Alert>
			navigate("/"); // Redirige al dashboard u otra vista tras crear el producto
		} catch (error:any) {
			<Alert severity="error">Error al crear el cliente + {error}</Alert>;
		}
	};

	return (
		<div style={{background: '#FFDE95', margin: '3%', borderRadius: '3%', padding: '3%'}}>
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
				Crear Nuevo cliente
			</Typography>
			<form onSubmit={handleSubmit} >
				<TextField
					label="Nombre del Cliente"
					fullWidth
					margin="normal"
					
					value={customerName}
					onChange={(event) => setCustomerName(event.target.value)}
					required
				/>
				<TextField
					label="Telefono de contacto"
					fullWidth
					margin="normal"
					value={customerPhone}
					onChange={(event) => setCustomerPhone(event.target.value)}
					required
				/>
				<TextField
					label="Email del cliente"
					fullWidth
					margin="normal"
					value={customerEmail}
					onChange={(event) => setCustomerEmail(event.target.value)}
				/>

				<Button variant="contained" color="secondary" type="submit">
					Crear Cliente
				</Button>
			</form>
		</div>
	);
};

export default FormCreateCustomer;
