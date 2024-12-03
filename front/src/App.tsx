import { Box, Typography, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";
import ClientDetail from "./components/ClientDetail";
import FormCreateProduct from "./components/FormCreateProduct";
import FormCreateCustomer from "./components/FormCreateCustomer";
import FormCreatePurchase from "./components/FormCreatePurchase";
import ProductDetail from "./components/ProductDetail";
import PurchaseDetail from "./components/PurchaseDetail";
import UpdatePrice from "./components/UpdatePrice";

function App() {
	return (
		<Box
			display="flex"
			flexDirection="column" // Cambia a 'column' para alinear verticalmente
			alignItems="center" // Alinea horizontalmente
			justifyContent="center" // Alinea verticalmente
			minHeight="100vh" // Asegura que ocupa todo el alto de la pantalla
			bgcolor=" #ADD899"
		>
			<CssBaseline />
			<Box
				width="100%" // Ocupa todo el ancho
				bgcolor=" #FFDE95" // Color de fondo del contenedor
				p={2} // Padding alrededor del título
			>
				<Typography variant="h4" color="#434d3e" gutterBottom>
					Aromas Frescos | Base de Datos
				</Typography>
			</Box>
			<Routes>
				<Route path="/" element={<Loading />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/client/:id" element={<ClientDetail />} />
				<Route path="/createProduct" element={<FormCreateProduct />} />
				<Route path="/createCustomer" element={<FormCreateCustomer />} />
				<Route path="/createPurchase" element={<FormCreatePurchase />} />
				<Route path="/product/:id" element={<ProductDetail />} />
				<Route path="/purchase/:id" element={<PurchaseDetail />} />
				<Route path="/updatePrice" element={<UpdatePrice />} />
			</Routes>
		</Box>
	);
}

export default App;
