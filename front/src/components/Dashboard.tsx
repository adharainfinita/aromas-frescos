import {
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
	Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
	const products = useSelector((state: RootState) => state.products.products);
	const customers = useSelector((state: RootState) => state.clients.customers);
	const purchases = useSelector(
		(state: RootState) => state.purchases.purchases
	);
	const navigate = useNavigate();

	const customerMap = new Map(
		customers.map((customer) => [customer.customer_id, customer.customer_name])
	);

	const customerListItems =
		customers.length > 0 ? (
			customers.map((customer) => (
				<ListItem key={customer.customer_id}>
					<ListItemText primary={customer.customer_name} />
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
								color: "#DAF7A6", // Cambia el color según tu paleta
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
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					bgcolor: "#922b21",
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

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					bgcolor: "#922b21",
					p: 2,
					borderRadius: 2,
					mb: 2,
				}}
			>
				<Typography variant="h6" color="#DAF7A6" style={{margin:"2%"}}>
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
			<List>{productListItems}</List>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					bgcolor: "#5b2c6f",
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
