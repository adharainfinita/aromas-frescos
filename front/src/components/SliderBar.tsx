import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetFilters} from "../redux/features/productsSlice.ts";

const SliderBar: React.FC = () => {
 const dispatch= useDispatch();
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				position: "fixed",
				bottom: 16,
				right: 3,
				padding: 0,
				display: "flex",
				flexDirection: "column",
				gap: 1,
			}}
		>
			{/* Contenedor flotante para los botones de navegación con solo iconos */}
			<Button
				onClick={() => {
					navigate("/");
    dispatch(resetFilters);
				}}
			>
				<RefreshIcon />
			</Button>
			<Button sx={{ minWidth: "auto", padding: 0 }}>
				<a href="#clientes" style={{ border: "hidden" }}>
					<AccountCircleIcon />
				</a>
			</Button>
			<Button sx={{ minWidth: "auto", padding: 0 }}>
				<a href="#productos" style={{ border: "hidden" }}>
					<ListIcon />
				</a>
			</Button>
			<Button sx={{ minWidth: "auto", padding: 0 }}>
				<a href="#compras" style={{ border: "hidden" }}>
					<StoreIcon />
				</a>
			</Button>
		</Box>
	);
};

export default SliderBar;
