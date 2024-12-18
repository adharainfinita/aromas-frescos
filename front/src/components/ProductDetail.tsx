import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { setProductDetail } from "../redux/features/productsSlice";
import { Button, Typography, TextField, Box } from "@mui/material";
import { updateProduct, deleteProduct } from "../services/productsServices";
import { IProductEditForm } from "../interfaces/product";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';

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
		stock: productDetail?.product_stock,
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
			stock: productDetail?.product_stock,
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
				Swal.fire('Éxito', 'al actualizar el producto', 'success');
				navigate("/");
			} catch (error: any) {
				Swal.fire({
					title: 'Error!',
					text: error,
					icon: 'error',
					confirmButtonText: 'Continuar'
				})
			}
		}
	};

	//Elimina el producto
	const handleDelete = async(id: number)=>{
		try {
			await deleteProduct(id);
			Swal.fire({
				title: 'Éxito!',
				text: 'Producto eliminado con éxito',
				icon: 'success',
				confirmButtonText: 'Continuar'
			})
			navigate('/');
		} catch (error: any) {
			Swal.fire({
				title: 'Error!',
				text: error,
				icon: 'error',
				confirmButtonText: 'Continuar'
			})
			
		}
	}

	if (!productDetail) {
		return <Typography>No se encontró el producto</Typography>;
	}

	return (
		<Box sx={{ p: 2, backgroundColor: "#BC5A94", borderRadius: "4px" }}>
			<Button
				variant="contained"
				color="inherit"
				size="large"
				onClick={() => navigate("/")}
			>
				🔙
			</Button>
			<Typography variant="h4" color="#DAF7A6" gutterBottom>
				Detalles del producto
			</Typography>

			{isEditing ? (
				<>
					<TextField
						label="Nombre"
						name="name"
						value={editableProduct?.name || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
						sx={{
							"& .MuiInputBase-root": {
								backgroundColor: "#DAF7A6", // Color de fondo
							},
						}}
					/>
					<TextField
						label="Categoría"
						name="category"
						value={editableProduct?.category || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
						sx={{
							"& .MuiInputBase-root": {
								backgroundColor: "#DAF7A6", // Color de fondo
							},
						}}
					/>
					<TextField
						label="Marca"
						name="brand"
						value={editableProduct?.brand || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
						sx={{
							"& .MuiInputBase-root": {
								backgroundColor: "#DAF7A6",
							},
						}}
					/>
					<TextField
						label="Precio"
						name="price"
						type="number"
						value={editableProduct?.price || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
						sx={{
							"& .MuiInputBase-root": {
								backgroundColor: "#DAF7A6", // Color de fondo
							},
						}}
					/>
						<TextField
						label="Stock"
						name="stock"
						type="number"
						value={editableProduct?.stock || ""}
						onChange={handleChange}
						fullWidth
						margin="normal"
						sx={{
							"& .MuiInputBase-root": {
								backgroundColor: "#DAF7A6", // Color de fondo
							},
						}}
					/>
					<Button variant="contained" color="primary" onClick={handleSave}>
						Guardar Cambios
					</Button>
				</>
			) : (
				<>
					<Typography variant="body1" color="#DAF7A6" style={{ margin: "5%" }}>
						🔸Nombre: {productDetail.product_name}
					</Typography>
					<Typography variant="body1" color="#DAF7A6" style={{ margin: "5%" }}>
						🔸Categoría: {productDetail.product_category}
					</Typography>
					<Typography variant="body1" color="#DAF7A6" style={{ margin: "5%" }}>
						🔸Marca: {productDetail.product_brand}
					</Typography>
					<Typography variant="body1" color="#DAF7A6" style={{ margin: "5%" }}>
						🔸Precio: {productDetail.product_price}
					</Typography>
					{productDetail.product_stock > 0 ? (
						<Typography
							variant="body1"
							color="#DAF7A6"
							style={{ margin: "5%" }}
						>
							🔸Stock: {productDetail.product_stock}
						</Typography>
					) : (
						<Typography
							variant="body1"
							color="#DAF7A6"
							style={{ margin: "5%" }}
						>
							🔸Stock: Sin Stock
						</Typography>
					)}
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setIsEditing(true)}
						style={{ margin: "2%", background: "#922b21" }}
					>
						Editar
						<EditIcon/>
					</Button>
					<Button 
					variant="contained"
					color="secondary"
					onClick={() => handleDelete(productDetail.product_id)}
					style={{ margin: "2%", background: "#922b21" }}
					>
						Eliminar
						<DeleteIcon/>
					</Button>
				</>
			)}
		</Box>
	);
};

export default ProductDetail;
