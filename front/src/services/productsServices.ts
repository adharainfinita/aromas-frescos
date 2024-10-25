import axios from "axios";
const URL_HOST = import.meta.env.VITE_HOST
export const getAllProducts= async() => {
  try {
    const response = await axios(`${URL_HOST}/products`);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
}