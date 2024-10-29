import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
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
			alert("Cliente creado con éxito");
			navigate("/"); // Redirige al dashboard u otra vista tras crear el producto
		} catch (error) {
			console.error("Error al crear el cliente:", error);
			alert("Error al crear el cliente");
		}
	};

	return (
		<div>
			<Button
				variant="contained"
				size="large"
				onClick={() => {
					navigate("/");
				}}
			>
				🔙
			</Button>

			<Typography variant="h4" gutterBottom>
				Crear Nuevo cliente
			</Typography>
			<form onSubmit={handleSubmit}>
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

				<Button variant="contained" color="primary" type="submit">
					Crear Cliente
				</Button>
			</form>
		</div>
	);
};

export default FormCreateCustomer;
