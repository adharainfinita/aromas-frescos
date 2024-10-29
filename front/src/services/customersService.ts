import axios from "axios";
import { ICustomerForm } from "../interfaces/customer";
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