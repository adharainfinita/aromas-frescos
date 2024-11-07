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
	FormControlLabel
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { setCategoryFilter, setAvailabilityFilter, selectFilteredAndSortedProducts } from "../redux/features/productsSlice";


const Dashboard = () => {
	const dispatch = useDispatch();
	const products = useSelector(selectFilteredAndSortedProducts);
	const customers = useSelector((state: RootState) => state.clients.customers);
	const purchases = useSelector(
		(state: RootState) => state.purchases.purchases
	);
	const navigate = useNavigate();

	const customerMap = new Map(
		customers.map((customer) => [customer.customer_id, customer.customer_name])
	);

	const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		dispatch(setCategoryFilter(event.target.value as string));
	};

	const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setAvailabilityFilter(event.target.checked ? true : null));
	};

	const customerListItems =
		customers.length > 0 ? (
			customers.map((customer) => (
				<ListItem key={customer.customer_id}>
					<ListItemText 
					primary={customer.customer_name}
					primaryTypographyProps={{
						sx: {
							color: "#191c18",
							fontWeight: "bold"
						}
					}}
					/>
					<Link to={`/client/${customer.customer_id}`}>Abrir</Link>
				</ListItem>
			))
		) : (
			<Typography color="#FF5733">No hay clientes disponibles</Typography>
		);

	const productListItems =
		products.length > 0 ? (
			products.map((product) => (
				<ListItem key={product.product_id}>
					<ListItemText
						primary={product.product_name}
						primaryTypographyProps={{
							sx: {
								color: "#191c18", // Cambia el color según tu paleta
								fontWeight: "bold", // Aplica negrita o cualquier otro estilo
							},
						}}
					/>
					<Link to={`/product/${product.product_id}`}>Abrir</Link>
				</ListItem>
			))
		) : (
			<Typography color="#FF5733">No hay productos disponibles</Typography>
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
		<Box sx={{ padding: 2 }}>
			{/* Filtros de productos */}
			

			{/* Sección de Clientes */}
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
					variant="contained"
					onClick={handleSubmit("customer")}
					sx={{ bgcolor: "#4a235a" }}
				>
					Agregar Cliente
				</Button>
			</Box>
			<List>{customerListItems}</List>

			{/* Sección de Productos */}
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
					value=""
					onChange={handleCategoryChange}
				>
					<MenuItem value="">Todas</MenuItem>
					{Array.from(new Set(products.map((p) => p.product_category))).map((category) => (
						<MenuItem key={category} value={category}>
							{category}
						</MenuItem>
					))}
				</TextField>
				<FormControlLabel
					control={<Checkbox onChange={handleAvailabilityChange} />}
					label="Disponibles"
				/>
			</Box>
			<List>{productListItems}</List>

			{/* Sección de Compras */}
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
					variant="contained"
					onClick={handleSubmit("purchase")}
					sx={{ bgcolor: "#4a235a" }}
				>
					Crear compra
				</Button>
			</Box>
			<List>{purchaseListItems}</List>
		</Box>
	);
};

export default Dashboard;
