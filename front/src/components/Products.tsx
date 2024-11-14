import {
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
	Box,
	TextField,
	MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { orderProducts } from "../redux/features/productsSlice";
import { IProduct } from "../interfaces/product";
import Filters from "./Filters";

type ProductsProps = {
	productsList: IProduct[];
	onButtonClick: (event: "product") => void;
};

const Products = ({ productsList, onButtonClick }: ProductsProps) => {
	const dispatch = useDispatch();

	const handleProductOrderChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		dispatch(orderProducts(event.target.value as string));
	};

	return (
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
					onClick={() => onButtonClick("product")}
					sx={{ bgcolor: "#4a235a" }}
				>
					Agregar Producto
				</Button>
			</Box>
			<Filters />
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
				{productsList.length > 0 ? (
					productsList.map((product) => (
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
					<Typography color="#FF5733">No hay productos disponibles</Typography>
				)}
			</List>
		</Box>
	);
};

export default Products;
