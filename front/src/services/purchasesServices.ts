import axios from "axios";
import { IPurchaseForm } from "../interfaces/purchase";
const URL_HOST = import.meta.env.VITE_HOST;
import { axiosConfig } from "./productsServices";


export const getAllPurchases = async () => {
	try {
		const response = await axios(`${URL_HOST}/purchase`, axiosConfig);
		return response.data;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			const statusCode = error.response?.status; // Obtiene el código de estado
			const errorMessage = error.response?.data?.error || "An error occurred while fetching purchases.";
			// Lanzar un nuevo error con el código de estado incluido en el mensaje
			throw new Error(`Error ${statusCode}: ${errorMessage}`);
	} else {
			// Si no es un error de Axios, lanzar un error genérico
			throw new Error("An unexpected error occurred.");
	}
	}
};

export const getPurchaseById = async (id: number) => {
	try {
		const response = await axios(`${URL_HOST}/purchase/${id}`, axiosConfig);
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
};

export const createPurchase = async (purchase: IPurchaseForm) => {
	try {
		const response = await axios.post(`${URL_HOST}/purchase`, purchase, axiosConfig);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error))
			errorMessage = error.response?.data.error || errorMessage;
	}
};
