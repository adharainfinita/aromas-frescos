import { Box, Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";
import { filterProductsByCategory, filtersProductByAvailable } from "../redux/features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";


const Filters:React.FC = () => {
  const products = useSelector((state: RootState) => state.products.originalCopy);
	const dispatch = useDispatch();

	const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		dispatch(filterProductsByCategory(event.target.value as string));
	};

	const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(filtersProductByAvailable(event.target.checked ? true : null));
	};
    return(
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <TextField
        label="Categoría"
        select
        fullWidth
        value={useSelector((state: RootState) => state.products.requireFilters.category) || ""}
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
            checked={useSelector((state: RootState) => state.products.requireFilters.availbable) ?? false}
            onChange={handleAvailabilityChange}
          />
        }
        label="Disponibles"
      />
    </Box>
    )
}

export default Filters;