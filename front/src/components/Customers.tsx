import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { orderCustomers } from "../redux/features/clientsSlice";
import { ICustomer } from "../interfaces/customer";

type customersProps = {
	customersList: ICustomer[];
	onButtonClick: (event: 'customer') => void;
};

const Customers = ({customersList, onButtonClick}:customersProps) => {
	const dispatch = useDispatch();

	const handlerCustomerOrderChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		dispatch(orderCustomers(event.target.value as string));
	};
	const customerListItems =
		customersList.length > 0 ? (
			customersList.map((customer) => (
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
					Clientes
				</Typography>
				<Button
					id="clientes"
					variant="contained"
					onClick={()=>{onButtonClick("customer")}}
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
	);
};

export default Customers;
