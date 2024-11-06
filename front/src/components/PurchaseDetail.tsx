import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { setPurchaseDetail } from "../redux/features/purchaseSlice";
import { getPurchaseById } from "../services/purchasesServices";
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Button,
	Box,
} from "@mui/material";

const PurchaseDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	// Seleccionar el detalle de la compra y los productos desde Redux
	const purchaseDetail = useSelector(
		(state: RootState) => state.purchases.detail
	);
	const purchase = useSelector((state: RootState) =>
		state.purchases.purchases.find((p) => p.purchase_id === Number(id))
	);
	const products = useSelector((state: RootState) => state.products.products);

	useEffect(() => {
		const fetchPurchaseDetail = async () => {
			try {
				const details = await getPurchaseById(Number(id));
				dispatch(setPurchaseDetail(details));
			} catch (error) {
				console.error("Error fetching purchase details:", error);
			}
		};

		fetchPurchaseDetail();
	}, [dispatch, id]);

	if (!purchaseDetail || !purchase) {
		return <Typography>No se encontraron detalles de la compra.</Typography>;
	}

	return (
		<div>
			<Box sx={{ p: 2, backgroundColor: "#BC5A94", borderRadius: "4px" }}>
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
				<Typography variant="h4" color="#DAF7A6" gutterBottom>
					Detalles de la Compra
				</Typography>
				<Typography variant="body1" color="#DAF7A6" style={{ margin: "4%" }}>
					🔸ID de Compra: {purchase.purchase_id}
				</Typography>
				<Typography variant="body1" color="#DAF7A6" style={{ margin: "5%" }}>
					🔸Monto: {purchase.purchase_amount}
				</Typography>
				<Typography variant="body1" color="#DAF7A6" style={{ margin: "5%" }}>
					🔸Estado: {purchase.purchase_paid ? "Pagada" : "Pendiente"}
				</Typography>

				<Typography variant="h6" style={{ width:'100%',	backgroundColor: "#ADD899", margin: "0 auto", borderBottom: '1px solid black', borderRadius:'2%'}}>
					Detalles de los Productos
				</Typography>
				<List>
					{purchaseDetail.details.map((detail) => {
						// Buscar el nombre del producto usando el product_id en la lista de productos
						const product = products.find(
							(prod) => prod.product_id === detail.product_id
						);

						return (
							<ListItem key={detail.purchase_detail_id}>
								<ListItemText
									primary={`Producto: ${
										product ? product.product_name : "Nombre no disponible"
									}`}
									secondary={`Cantidad: ${detail.quantity}, Precio por Unidad: ${detail.price_per_unit}`}
								/>
							</ListItem>
						);
					})}
				</List>
			</Box>
		</div>
	);
};

export default PurchaseDetail;
