import { useNavigate } from "react-router-dom";
import SliderBar from "./SliderBar";
import { useState } from "react";
import { Box } from "@mui/material";
import Products from "./Products";
import Customers from "./Customers";
import Purchase from "./Purchases";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Dashboard = () => {
	const products = useSelector((state: RootState) => state.products.products);
	const customers = useSelector((state: RootState) => state.clients.customers);
	const purchases = useSelector((state: RootState) => state.purchases.purchases);
	const navigate = useNavigate();
	const [_isActive, setActive] = useState<"product" | "customer" | "purchase" | "">("");

	const handleButtonClick = (event: "product" | "customer" | "purchase") => {
		setActive(event);
		handleSubmit(event)();
	};

	const handleSubmit = (event: string) => () => {
		if (event === "product") {
			navigate("/createProduct");
		} else if (event === "customer") {
			navigate("/createCustomer");
		} else if (event === "purchase") {
			navigate("/createPurchase");
		}
	};

	return (
		<Box sx={{ padding: 2, marginRight: "15%" }}>
		
			<SliderBar />
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					gap: 2,
				}}
			>
				<Customers customersList={customers} onButtonClick={handleButtonClick}/>
				<Products productsList={products} onButtonClick={handleButtonClick} />
			</Box>
			<Purchase purchaseList={purchases} customersList={customers} onButtonClick={handleButtonClick}/>
		</Box>
	);
};

export default Dashboard;
