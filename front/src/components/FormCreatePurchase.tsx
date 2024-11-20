import React, { useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Checkbox,
	FormControlLabel,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
} from "@mui/material";
import { createPurchase } from "../services/purchasesServices";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	PurchaseForm,
	IdetailsForm,
	IPurchaseForm,
} from "../interfaces/purchase";
import { RootState } from "../redux/store";
import Swal from "sweetalert2";
import { filterProductsByCategory } from "../redux/features/productsSlice";

const FormCreatePurchase: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const customers = useSelector((state: RootState) => state.clients.customers);
	const products = useSelector((state: RootState) => state.products.products);

	// Estados para los datos generales de la compra y detalles
	const [purchaseGeneral, setPurchaseGeneral] = useState<PurchaseForm>({
		customerId: 0,
		totalAmount: 0,
		paid: false,
		paidDate: "",
	});
	const [purchaseDetails, setPurchaseDetails] = useState<IdetailsForm[]>([]);

	// Manejo de cambios en campos de datos generales
	const handleGeneralChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target;
		setPurchaseGeneral((prevState) => ({
			...prevState,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleCustomerChange = (event: SelectChangeEvent<number>) => {
		setPurchaseGeneral((prevState) => ({
			...prevState,
			customerId: event.target.value as number,
		}));
	};

	const handleProductChange = (index: number, event: SelectChangeEvent<number>) => {
		setPurchaseDetails((prevDetails) =>
			prevDetails.map((detail, i) =>
				i === index ? { ...detail, productId: event.target.value as number } : detail
			)
		);
	};

	// Manejo de cambios en campos de detalles de la compra
	const handleDetailChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setPurchaseDetails((prevDetails) =>
			prevDetails.map((detail, i) =>
				i === index ? { ...detail, [name]: Number(value) } : detail
			)
		);
	};

	// Manejo de cambios en la categoría seleccionada
	const handleCategoryChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		dispatch(filterProductsByCategory(event.target.value as string));
	};

	// Agregar un nuevo detalle de compra
	const addDetail = () => {
		setPurchaseDetails([
			...purchaseDetails,
			{ productId: 0, quantity: 0, pricePerUnit: 0 },
		]);
	};

	// Manejo del envío del formulario
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const newPurchase: IPurchaseForm = {
			purchase: purchaseGeneral,
			details: purchaseDetails,
		};

		try {
			await createPurchase(newPurchase);
			Swal.fire("Éxito", "al guardar la compra", "success");
			navigate("/");
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
				background: "#F075AA",
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

			<Typography variant="h4">Crear Compra</Typography>

			<form onSubmit={handleSubmit}>
				<Typography variant="h6">Datos Generales</Typography>

				<InputLabel>Nombre del Cliente</InputLabel>
				<Select
					name="customerId"
					fullWidth
					value={purchaseGeneral.customerId}
					onChange={handleCustomerChange}
					label="Cliente"
				>
					{customers.map((customer) => (
						<MenuItem key={customer.customer_id} value={customer.customer_id}>
							{customer.customer_name}
						</MenuItem>
					))}
				</Select>
				<TextField
					label="Monto Total"
					type="number"
					name="totalAmount"
					value={purchaseGeneral.totalAmount}
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
					name="paidDate"
					value={purchaseGeneral.paidDate}
					onChange={handleGeneralChange}
					InputLabelProps={{ shrink: true }}
					fullWidth
					margin="normal"
				/>

				<Typography variant="h6">Detalles de la Compra</Typography>

				{/* Filtro por categoría */}
				<InputLabel>Categoría</InputLabel>
				<TextField
					label="Categoría"
					select
					fullWidth
					value={
						useSelector(
							(state: RootState) => state.products.requireFilters.category
						) || ""
					}
					onChange={handleCategoryChange}
				>
					<MenuItem value="All">Todas</MenuItem>
					{Array.from(new Set(products.map((p) => p.product_category))).map(
						(category) => (
							<MenuItem key={category} value={category}>
								{category}
							</MenuItem>
						)
					)}
				</TextField>

				{/* Detalles de la compra */}
				{purchaseDetails.map((detail, index) => (
					<div key={index}>
						<Select
							name="productId"
							fullWidth
							value={detail.productId}
							onChange={(e) => handleProductChange(index, e)}
							label="Producto"
						>
							{products.map((product) => (
								<MenuItem key={product.product_id} value={product.product_id}>
									{product.product_name}
								</MenuItem>
							))}
						</Select>
						<TextField
							label="Cantidad"
							type="number"
							name="quantity"
							value={detail.quantity}
							onChange={(e) => handleDetailChange(index, e)}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Precio por Unidad"
							type="number"
							name="pricePerUnit"
							value={detail.pricePerUnit}
							onChange={(e) => handleDetailChange(index, e)}
							fullWidth
							margin="normal"
						/>
					</div>
				))}

				<Button
					onClick={addDetail}
					variant="outlined"
					color="primary"
					style={{ marginTop: "10px" }}
				>
					Agregar Detalle
				</Button>

				<Button
					variant="contained"
					type="submit"
					color="secondary"
					style={{ marginTop: "20px" }}
				>
					Agregar Compra
				</Button>
			</form>
		</div>
	);
};

export default FormCreatePurchase;
