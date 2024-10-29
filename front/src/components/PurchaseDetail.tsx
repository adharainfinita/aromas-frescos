import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { setPurchaseDetail } from "../redux/features/purchaseSlice";
import { getPurchaseById } from "../services/purchasesServices"; // Asegúrate de que esta ruta sea correcta
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Button,
} from "@mui/material";

const PurchaseDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const purchaseDetail = useSelector(
		(state: RootState) => state.purchases.detail
	);
	const purchase = useSelector((state: RootState) =>
		state.purchases.purchases.find((p) => p.purchase_id === Number(id))
	);

	useEffect(() => {
		const fetchPurchaseDetail = async () => {
			try {
				const details = await getPurchaseById(Number(id));
				dispatch(setPurchaseDetail(details)); // Asegúrate de que details contenga tanto la compra como el array de detalles
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
			<Button
				variant="contained"
				size="large"
				onClick={() => {
					navigate("/");
				}}
			>
				🔙
			</Button>
			<Typography variant="h4">Detalles de la Compra</Typography>
			<Typography variant="body1">
				ID de Compra: {purchase.purchase_id}
			</Typography>
			<Typography variant="body1">Monto: {purchase.purchase_amount}</Typography>
			<Typography variant="body1">
				Estado: {purchase.purchase_paid ? "Pagada" : "Pendiente"}
			</Typography>

			<Typography variant="h6">Detalles de los Productos</Typography>
			<List>
				{purchaseDetail.details.map((detail) => (
					<ListItem key={detail.purchase_detail_id}>
						<ListItemText
							primary={`Producto ID: ${detail.product_id}`}
							secondary={`Cantidad: ${detail.quantity}, Precio por Unidad: ${detail.price_per_unit}`}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default PurchaseDetail;
