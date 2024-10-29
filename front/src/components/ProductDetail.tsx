import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { setProductDetail } from "../redux/features/productsSlice";
import { Button, Typography } from "@mui/material";

const ProductDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const products = useSelector((state: RootState) => state.products.products);
	const productDetail = useSelector(
		(state: RootState) => state.products.detail
	);

	useEffect(() => {
		const productFound = products.find(
			(product) => product.product_id === Number(id)
		);
		dispatch(setProductDetail(productFound || null));
	}, [dispatch, id, products]);

	if (!productDetail) {
		return <Typography>No se encontró el producto</Typography>;
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
			<Typography variant="h4">Detalles del producto</Typography>
			<Typography variant="body1">
				Nombre: {productDetail.product_name}
			</Typography>
			<Typography variant="body1">
				Categoría: {productDetail.product_category}
			</Typography>
			<Typography variant="body1">
				Marca: {productDetail.product_brand}
			</Typography>
			<Typography variant="body1">
				Precio {productDetail.product_price}
			</Typography>
		</div>
	);
};

export default ProductDetail;
