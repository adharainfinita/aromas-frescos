import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";


const Purchase: React.FC = () => {
  const purchases = useSelector((state: RootState) => state.purchases.purchases);
	const customers = useSelector((state: RootState) => state.clients.customers);

	const customerMap = new Map(
		customers.map((customer) => [customer.customer_id, customer.customer_name])
	);
  const purchaseListItems = purchases.map((purchase) => {
		const customerName =
			customerMap.get(purchase.customer_id) || "Cliente desconocido";

      return (
        <ListItem key={purchase.purchase_id}>
          <ListItemText
            primary={`Cliente: ${customerName}`}
            secondary={`Monto: ${purchase.purchase_amount || 0}, ${
              purchase.purchase_paid ? "Pagada" : "Pendiente"
            }`}
          />
          <Link to={`/purchase/${purchase.purchase_id}`}>Abrir</Link>
        </ListItem>
      );
    });

    const handleSubmit = (event: string) => () => {
     
    };

  return (
    <Box sx={{ mt: 3 }}>
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
						Compras
					</Typography>
					<Button
						id="compras"
						variant="contained"
						onClick={handleSubmit("purchase")}
						sx={{ bgcolor: "#4a235a" }}
					>
						Crear compra
					</Button>
				</Box>
				<List>{purchaseListItems}</List>
			</Box>
  )
};

export default Purchase;