import axios from "axios";
import { ICustomerEditForm, ICustomerForm } from "../interfaces/customer";
import { axiosConfig } from "./productsServices";
const URL_HOST = import.meta.env.VITE_HOST


export const getAllCustomers= async() => {
  try {
    const response = await axios(`${URL_HOST}/customers`, axiosConfig);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
}

export const postCustomer = async (customer: ICustomerForm) => {
	try {
		const response = await axios.post(`${URL_HOST}/customers`, customer, axiosConfig);
		return response.data;
	} catch (error:any) {
		if (axios.isAxiosError(error)) {
			const statusCode = error.response?.status;
			const errorMessage = error.response?.data?.error || "An error ocurred while fetching customers";
			throw new Error(`Error ${statusCode}: ${errorMessage}`)
		} else {
			throw new Error("An unexpected error occurred.");
		}
	}
};


export const updateCustomer = async (customer: ICustomerEditForm, id: number) => {
	try {
		const response = await axios.put(`${URL_HOST}/customers/${id}`, customer, axiosConfig);
		console.log("respuesta del back: ", response.data);
		return response.data;
		
	} catch (error) {
		let errorMessage = "An Error ocurred";
		if (axios.isAxiosError(error))
			errorMessage = error.response?.data.error || errorMessage;
	}
};