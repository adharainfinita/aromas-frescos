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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import {

	orderProducts,
} from "../redux/features/productsSlice";
const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
	
	
  const handleSubmit = (event: string) => () => {
     
  };


	const handleProductOrderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		dispatch(orderProducts(event.target.value as string));
	};
  return(

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
        onClick={handleSubmit("product")}
        sx={{ bgcolor: "#4a235a" }}
      >
        Agregar Producto
      </Button>
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

    <List>
      {products.length > 0 ? (
        products.map((product) => (
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
        <Typography color="#FF5733">
          No hay productos disponibles
        </Typography>
      )}
    </List>
  </Box>
  )
};

export default Products;