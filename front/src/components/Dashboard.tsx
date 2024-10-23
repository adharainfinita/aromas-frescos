import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <div>
        <Typography variant="h4">Dashboard</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Cliente 1" />
        </ListItem>
        {/* Itera sobre la lista de clientes y productos */}
      </List>
      <Button variant="contained">Agregar Cliente</Button>
      <Button variant="contained">Agregar Producto</Button>
    </div>
  )
};

export default Dashboard;