import axios from "axios";
import { IProductEditForm, IProductForm } from "../interfaces/product";

const URL_HOST = import.meta.env.VITE_HOST;

// Configurar Axios para que incluya credenciales
export const axiosConfig = {
  withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
};

// Servicio para obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${URL_HOST}/products`, axiosConfig);
    return response.data || []; // Devuelve un array vacío si no hay datos
  } catch (error: any) {
    const errorMessage = axios.isAxiosError(error) 
      ? error.response?.data?.error || "An error occurred while fetching products."
      : "An unexpected error occurred.";
    throw new Error(errorMessage);
  }
};


// Servicio para crear un nuevo producto
export const postProduct = async (product: IProductForm) => {
	try {
		const response = await axios.post(`${URL_HOST}/products`, product, axiosConfig);
		return response.data;
	} catch (error: any) {
		const errorMessage = axios.isAxiosError(error) 
			? error.response?.data?.error || "An error occurred while creating the product."
			: "An unexpected error occurred.";
		throw new Error(errorMessage);
	}
};

// Servicio para actualizar un producto
export const updateProduct = async (product: IProductEditForm, id: number) => {
	try {
		const response = await axios.put(`${URL_HOST}/products/${id}`, product, axiosConfig);
		console.log("respuesta del back: ", response.data);
		return response.data;
	} catch (error: any) {
		const errorMessage = axios.isAxiosError(error) 
			? error.response?.data?.error || "An error occurred while updating the product."
			: "An unexpected error occurred.";
		throw new Error(errorMessage);
	}
};

// Servicio para eliminar un producto
export const deleteProduct = async (id: number) => {
	try {
		const response = await axios.delete(`${URL_HOST}/products/${id}`, axiosConfig);
		return response.data;
	} catch (error: any) {
		const errorMessage = axios.isAxiosError(error) 
			? error.response?.data?.error || "An error occurred while deleting the product."
			: "An unexpected error occurred.";
		throw new Error(errorMessage);
	}
};
