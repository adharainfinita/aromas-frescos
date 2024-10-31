import React, { useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Checkbox,
	FormControlLabel,
	Alert,
} from "@mui/material";
import { createPurchase } from "../services/purchasesServices";
import { useNavigate } from "react-router-dom";
import {
	PurchaseForm,
	IdetailsForm,
	IPurchaseForm,
} from "../interfaces/purchase";

const FormCreatePurchase: React.FC = () => {
	const navigate = useNavigate();

	// Estados para los datos generales de la compra y detalles
	const [purchaseGeneral, setPurchaseGeneral] = useState<PurchaseForm>({
		customer_id: 0,
		amount: 0,
		paid: false,
		paid_date: "",
	});
	const [purchaseDetail, setPurchaseDetail] = useState<IdetailsForm>({
		purchase_id: 0,
		product_id: 0,
		quantity: 0,
		price_per_unit: 0,
	});

	// Manejo de cambios en campos de datos generales
	const handleGeneralChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target;
		setPurchaseGeneral((prevState) => ({
			...prevState,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	// Manejo de cambios en campos de detalles de la compra
	const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setPurchaseDetail((prevState) => ({
			...prevState,
			[name]: Number(value),
		}));
	};

	// Manejo del envío del formulario
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const newPurchase: IPurchaseForm = {
			purchase: purchaseGeneral,
			details: purchaseDetail,
		};

		try {
			await createPurchase(newPurchase);
			<Alert severity="success">Compra generada con éxito</Alert>
			navigate("/");
		} catch (error:any) {
			<Alert severity="error">"Error al crear la compra:" + {error}</Alert>
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

			<Typography variant="h4">Crear Compra</Typography>
			<form onSubmit={handleSubmit}>
				<Typography variant="h6">Datos Generales</Typography>

				<TextField
					label="ID del Cliente"
					type="number"
					name="customer_id"
					value={purchaseGeneral.customer_id}
					onChange={handleGeneralChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Monto"
					type="number"
					name="amount"
					value={purchaseGeneral.amount}
					onChange={handleGeneralChange}
					fullWidth
					margin="normal"
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="paid"
							checked={purchaseGeneral.paid}
							onChange={handleGeneralChange}
						/>
					}
					label="Pagado"
				/>
				<TextField
					label="Fecha de Pago"
					type="date"
					name="paid_date"
					value={purchaseGeneral.paid_date}
					onChange={handleGeneralChange}
					InputLabelProps={{ shrink: true }}
					fullWidth
					margin="normal"
				/>

				<Typography variant="h6">Detalles de la Compra</Typography>

				<TextField
					label="ID del Producto"
					type="number"
					name="product_id"
					value={purchaseDetail.product_id}
					onChange={handleDetailChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Cantidad"
					type="number"
					name="quantity"
					value={purchaseDetail.quantity}
					onChange={handleDetailChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Precio por Unidad"
					type="number"
					name="price_per_unit"
					value={purchaseDetail.price_per_unit}
					onChange={handleDetailChange}
					fullWidth
					margin="normal"
				/>

				<Button
					variant="contained"
					type="submit"
					color="primary"
					style={{ marginTop: "20px" }}
				>
					Agregar Compra
				</Button>
			</form>
		</div>
	);
};

export default FormCreatePurchase;
