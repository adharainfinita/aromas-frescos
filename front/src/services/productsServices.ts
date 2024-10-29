import axios from "axios";
import {IProductEditForm, IProductForm } from "../interfaces/product";
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

export const updateProduct = async (product: IProductEditForm, id: number) => {
	try {
		const response = await axios.put(`${URL_HOST}/products/${id}`, product);
		console.log("respuesta del back: ", response.data);
		return response.data;
		
	} catch (error) {
		let errorMessage = "An Error ocurred";
		if (axios.isAxiosError(error))
			errorMessage = error.response?.data.error || errorMessage;
	}
};
