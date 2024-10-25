import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const customers = useSelector((state: RootState) => state.clients.customers);

  // Renderiza la lista de clientes
  const customerListItems = customers.length > 0
    ? customers.map((customer) => (
        <ListItem key={customer.customer_id}>
          <ListItemText primary={customer.customer_name} />
          <Link to={`/client/${customer.customer_id}`}>Abrir</Link>
        </ListItem>
      ))
    : <Typography>No hay clientes disponibles</Typography>;

  // Renderiza la lista de productos
  const productListItems = products.length > 0
    ? products.map((product) => (
        <ListItem key={product.product_id}>  
          <ListItemText primary={product.product_name} /> 
          <Link to={`/product/${product.product_id}`}>Abrir</Link>
        </ListItem>
      ))
    : <Typography>No hay productos disponibles</Typography>;

  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>

      <Typography variant="h6">Clientes</Typography>
      <List>
        {customerListItems}
      <Button variant="contained" style={{ marginRight: '10px' }}>Agregar Cliente</Button>
      </List>

      <Typography variant="h6">Productos</Typography>
      <List>
        {productListItems}
      <Button variant="contained">Agregar Producto</Button>
      </List>

    </div>
  );
};

export default Dashboard;
