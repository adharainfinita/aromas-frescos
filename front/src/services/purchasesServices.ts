import axios from "axios";
import { IPurchaseForm } from "../interfaces/purchase";
const URL_HOST = import.meta.env.VITE_HOST;

export const getAllPurchases = async () => {
	try {
		const response = await axios(`${URL_HOST}/purchase`);
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
};

export const getPurchaseById = async (id: number) => {
	try {
		const response = await axios(`${URL_HOST}/purchase/${id}`);
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
};

export const createPurchase = async (purchase: IPurchaseForm) => {
	try {
		const response = await axios.post(`${URL_HOST}/purchase`, purchase);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error))
			errorMessage = error.response?.data.error || errorMessage;
	}
};
