import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { setProductDetail } from "../redux/features/productsSlice";
import { Button, Typography, TextField } from "@mui/material";
import { updateProduct } from "../services/productsServices";
import { IProductEditForm } from "../interfaces/product";

const ProductDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const products = useSelector((state: RootState) => state.products.products);
	const productDetail = useSelector(
		(state: RootState) => state.products.detail
	);

	const [isEditing, setIsEditing] = useState(false);
	const [editableProduct, setEditableProduct] = useState<IProductEditForm>({
		name: productDetail?.product_name,
		brand: productDetail?.product_brand,
		category: productDetail?.product_category,
		price: productDetail?.product_price,
		available: productDetail?.product_available,
		discontinued: productDetail?.product_discontinued,
	});

	// Busca y asigna el producto en detalle
	useEffect(() => {
		const productFound = products.find(
			(product) => product.product_id === Number(id)
		);
		dispatch(setProductDetail(productFound || null));
	}, [dispatch, id, products]);

	// Sincroniza editableProduct cuando productDetail cambia
	useEffect(() => {
		setEditableProduct({
			name: productDetail?.product_name,
			brand: productDetail?.product_brand,
			category: productDetail?.product_category,
			price: productDetail?.product_price,
			available: productDetail?.product_available,
			discontinued: productDetail?.product_discontinued,
		});
	}, [productDetail]);

	// Maneja los cambios en los campos de texto
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditableProduct((prevProduct) => ({
			...prevProduct,
			[name]: name === "price" ? parseFloat(value) : value,
		}));
	};

	// Envía la actualización
	const handleSave = async () => {
		if (editableProduct) {
			try {
				await updateProduct(editableProduct, Number(id));
				setIsEditing(false); // Sal del modo de edición
				navigate("/");
			} catch (error) {
				console.error("Error al actualizar el producto:", error);
			}
		}
	};

	if (!productDetail) {
		return <Typography>No se encontró el producto</Typography>;
	}

	return (
		<div>
			<Button variant="contained" size="large" onClick={() => navigate("/")}>
				🔙
			</Button>
			<Typography variant="h4">Detalles del producto</Typography>

			{isEditing ? (
				<>
					<TextField
						label="Nombre"
						name="name"
						value={editableProduct?.name || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Categoría"
						name="category"
						value={editableProduct?.category || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Marca"
						name="brand"
						value={editableProduct?.brand || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Precio"
						name="price"
						type="number"
						value={editableProduct?.price || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
					/>
					<Button variant="contained" color="primary" onClick={handleSave}>
						Guardar Cambios
					</Button>
				</>
			) : (
				<>
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
						Precio: {productDetail.product_price}
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setIsEditing(true)}
					>
						Editar
					</Button>
				</>
			)}
		</div>
	);
};

export default ProductDetail;
