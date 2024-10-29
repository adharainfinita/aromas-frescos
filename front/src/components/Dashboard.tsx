import {
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
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
	// Mapeo de customer_id a customer_name
	const customerMap = new Map(
		customers.map((customer) => [customer.customer_id, customer.customer_name])
	);

	// Renderiza la lista de clientes
	const customerListItems =
		customers.length > 0 ? (
			customers.map((customer) => (
				<ListItem key={customer.customer_id}>
					<ListItemText primary={customer.customer_name} />
					<Link to={`/client/${customer.customer_id}`}>Abrir</Link>
				</ListItem>
			))
		) : (
			<Typography>No hay clientes disponibles</Typography>
		);

	// Renderiza la lista de productos
	const productListItems =
		products.length > 0 ? (
			products.map((product) => (
				<ListItem key={product.product_id}>
					<ListItemText primary={product.product_name} />
					<Link to={`/product/${product.product_id}`}>Abrir</Link>
				</ListItem>
			))
		) : (
			<Typography>No hay productos disponibles</Typography>
		);

	// Renderiza la lista de compras
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
		}
		if (event === "customer") {
			navigate("/createCustomer");
		} 
		else if(event === 'purchase') {
			navigate("/createPurchase");
		}
	};

	return (
		<div>
			<Typography variant="h4">Dashboard</Typography>

			<Typography variant="h6">Clientes</Typography>
			<List>
				{customerListItems}
				<Button
					variant="contained"
					style={{ marginRight: "10px" }}
					onClick={handleSubmit("customer")}
				>
					Agregar Cliente
				</Button>
			</List>

			<Typography variant="h6">Productos</Typography>
			<List>
				{productListItems}
				<Button variant="contained" onClick={handleSubmit("product")}>
					Agregar Producto
				</Button>
			</List>
			<Typography variant="h6">Compras</Typography>
			<List>
				{purchaseListItems}
				<Button
					variant="contained"
					style={{ marginRight: "10px" }}
					onClick={handleSubmit("purchase")}
				>
					Crear comprar
				</Button>
			</List>
		</div>
	);
};

export default Dashboard;
