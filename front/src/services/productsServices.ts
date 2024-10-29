import axios from "axios";
import { IProductForm } from "../interfaces/product";
const URL_HOST = import.meta.env.VITE_HOST;

export const getAllProducts = async () => {
	try {
		const response = await axios(`${URL_HOST}/products`);
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
};

export const postProduct = async (product: IProductForm) => {
	try {
		const response = await axios.post(`${URL_HOST}/products`, product);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
	}
};
