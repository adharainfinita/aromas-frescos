import axios from "axios";
const URL_HOST = import.meta.env.VITE_HOST

export const getAllCustomers= async() => {
  try {
    const response = await axios(`${URL_HOST}/customers`);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
}