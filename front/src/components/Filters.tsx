import {
	Box,
	Checkbox,
	FormControlLabel,
	MenuItem,
	TextField,
} from "@mui/material";
import {
	filterProductsByCategory,
	filtersProductByAvailable,
} from "../redux/features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { orderProducts } from "../redux/features/productsSlice";

const Filters: React.FC = () => {
	const products = useSelector(
		(state: RootState) => state.products.originalCopy
	);
	const dispatch = useDispatch();

	const handleCategoryChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		dispatch(filterProductsByCategory(event.target.value as string));
	};

	const handleAvailabilityChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		dispatch(filtersProductByAvailable(event.target.checked ? true : null));
	};
	const handleProductOrderChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		dispatch(orderProducts(event.target.value as string));
	};
	return (
		<>
			<Box sx={{ display: "flex", overflowWrap: "break-word", gap: 2, mb: 3 }}>
				<TextField
					label="Categoría"
					select
					fullWidth
					value={
						useSelector(
							(state: RootState) => state.products.requireFilters.category
						) || ""
					}
					onChange={handleCategoryChange}
				>
					<MenuItem value="All">Todas</MenuItem>
					{Array.from(new Set(products.map((p) => p.product_category))).map(
						(category) => (
							<MenuItem key={category} value={category}>
								{category}
							</MenuItem>
						)
					)}
				</TextField>
				<FormControlLabel
					control={
						<Checkbox
							checked={
								useSelector(
									(state: RootState) => state.products.requireFilters.availbable
								) ?? false
							}
							onChange={handleAvailabilityChange}
						/>
					}
					label="Disponibles"
				/>
			</Box>
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
		</>
	);
};

export default Filters;
