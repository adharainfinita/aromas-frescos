import axios from "axios";
import { ICustomerEditForm, ICustomerForm } from "../interfaces/customer";
const URL_HOST = import.meta.env.VITE_HOST

export const getAllCustomers= async() => {
  try {
    const response = await axios(`${URL_HOST}/customers`);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
}

export const postCustomer = async (customer: ICustomerForm) => {
	try {
		const response = await axios.post(`${URL_HOST}/customers`, customer);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
	}
};


export const updateCustomer = async (customer: ICustomerEditForm, id: number) => {
	try {
		const response = await axios.put(`${URL_HOST}/customers/${id}`, customer);
		console.log("respuesta del back: ", response.data);
		return response.data;
		
	} catch (error) {
		let errorMessage = "An Error ocurred";
		if (axios.isAxiosError(error))
			errorMessage = error.response?.data.error || errorMessage;
	}
};