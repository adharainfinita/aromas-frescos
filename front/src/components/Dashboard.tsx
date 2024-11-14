import { useNavigate } from "react-router-dom";
import SliderBar from "./SliderBar";

import { useState } from "react";
import { Box } from "@mui/material";

const Dashboard = () => {

	const navigate = useNavigate();
	const [isActive, setActive] = useState<'product'|'customer'|'purchase'|''>('');



	
	

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
				

			</Box>

			
		</Box>
	);
};

export default Dashboard;
