import {
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
	Box,
	TextField,
	MenuItem,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import {
	filterProductsByCategory,
	filtersProductByAvailable,
	orderProducts,
} from "../redux/features/productsSlice";
import SliderBar from "./SliderBar";
import { orderCustomers } from "../redux/features/clientsSlice";

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const products = useSelector((state: RootState) => state.products.products);
	const customers = useSelector((state: RootState) => state.clients.customers);
	const purchases = useSelector((state: RootState) => state.purchases.purchases);
	const customerMap = new Map(
		customers.map((customer) => [customer.customer_id, customer.customer_name])
	);

	const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		dispatch(filterProductsByCategory(event.target.value as string));
	};

	const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(filtersProductByAvailable(event.target.checked ? true : null));
	};

	const handleProductOrderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		dispatch(orderProducts(event.target.value as string));
	};
	const handlerCustomerOrderChange = (event: React.ChangeEvent<{value:unknown}>) =>{
		dispatch(orderCustomers(event.target.value as string));
	}

	const customerListItems =
		customers.length > 0 ? (
			customers.map((customer) => (
				<ListItem key={customer.customer_id}>
					<ListItemText
						primary={customer.customer_name}
						primaryTypographyProps={{
							sx: {
								color: "#191c18",
								fontWeight: "bold",
							},
						}}
					/>
					<Link to={`/client/${customer.customer_id}`}>Abrir</Link>
				</ListItem>
			))
		) : (
			<Typography color="#FF5733">No hay clientes disponibles</Typography>
		);

	const purchaseListItems = purchases.map((purchase) => {
		const customerName =
			customerMap.get(purchase.customer_id) || "Cliente desconocido";
		return (
			<ListItem key={purchase.purchase_id}>
				<ListItemText
					primary={`Cliente: ${customerName}`}
					secondary={`Monto: ${purchase.purchase_amount || 0}, ${
						purchase.purchase_paid ? "Pagada" : "Pendiente"
					}`}
				/>
				<Link to={`/purchase/${purchase.purchase_id}`}>Abrir</Link>
			</ListItem>
		);
	});

	const handleSubmit = (event: string) => () => {
		if (event === "product") {
			navigate("/createProduct");
		} else if (event === "customer") {
			navigate("/createCustomer");
		} else if (event === "purchase") {
			navigate("/createPurchase");
		}
	};

	return (
		<Box sx={{ padding: 2, marginRight: "15%" }}>
			<SliderBar />
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					gap: 2,
				}}
			>
				<Box sx={{ flex: 1 }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							bgcolor: "#BC5A94",
							p: 2,
							borderRadius: 2,
							mb: 2,
						}}
					>
						<Typography variant="h6" color="#DAF7A6">
							Clientes
						</Typography>
						<Button
							id="clientes"
							variant="contained"
							onClick={handleSubmit("customer")}
							sx={{ bgcolor: "#4a235a" }}
						>
							Agregar Cliente
						</Button>
						</Box>
						<TextField
							label="Orden"
							select
							fullWidth
							value=""
							onChange={handlerCustomerOrderChange}
						>
							<MenuItem value="A">Ascendente</MenuItem>
							<MenuItem value="D">Descendente</MenuItem>
						</TextField>
					<List>{customerListItems}</List>
				</Box>

				<Box sx={{ flex: 1 }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							bgcolor: "#BC5A94",
							p: 2,
							borderRadius: 2,
							mb: 2,
						}}
					>
						<Typography variant="h6" color="#DAF7A6">
							Productos
						</Typography>
						<Button
							id="productos"
							variant="contained"
							onClick={handleSubmit("product")}
							sx={{ bgcolor: "#4a235a" }}
						>
							Agregar Producto
						</Button>
					</Box>
					<Box sx={{ display: "flex", gap: 2, mb: 3 }}>
						<TextField
							label="Categoría"
							select
							fullWidth
							value={useSelector((state: RootState) => state.products.requireFilters.category) || ""}
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
						<FormControlLabel
							control={
								<Checkbox
									checked={useSelector((state: RootState) => state.products.requireFilters.availbable) ?? false}
									onChange={handleAvailabilityChange}
								/>
							}
							label="Disponibles"
						/>
					</Box>
						<TextField
							label="Orden"
							select
							fullWidth
							value=""
							onChange={handleProductOrderChange}
						>
							<MenuItem value="A">Ascendente</MenuItem>
							<MenuItem value="D">Descendente</MenuItem>
						</TextField>

					<List>
						{products.length > 0 ? (
							products.map((product) => (
								<ListItem key={product.product_id}>
									<ListItemText
										primary={product.product_name}
										secondary={`Precio: ${product.product_price}`}
										primaryTypographyProps={{
											sx: {
												color: "#191c18",
												fontWeight: "bold",
											},
										}}
									/>
									<Link to={`/product/${product.product_id}`}>Abrir</Link>
								</ListItem>
							))
						) : (
							<Typography color="#FF5733">
								No hay productos disponibles
							</Typography>
						)}
					</List>
				</Box>
			</Box>

			<Box sx={{ mt: 3 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						bgcolor: "#BC5A94",
						p: 2,
						borderRadius: 2,
						mb: 2,
					}}
				>
					<Typography variant="h6" color="#DAF7A6">
						Compras
					</Typography>
					<Button
						id="compras"
						variant="contained"
						onClick={handleSubmit("purchase")}
						sx={{ bgcolor: "#4a235a" }}
					>
						Crear compra
					</Button>
				</Box>
				<List>{purchaseListItems}</List>
			</Box>
		</Box>
	);
};

export default Dashboard;
