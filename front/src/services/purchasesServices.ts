import axios from "axios";
const URL_HOST = import.meta.env.VITE_HOST;

export const getAllPurchases = async() =>{ 
  try {
    const response = await axios(`${URL_HOST}/purchase`);
    return response.data;
  } catch (error:any) {
      throw error.message;
  }
};

export const getPurchaseById = async(id:number)=>{
  try {
    const response = await axios(`${URL_HOST}/purchase/${id}`);
    return response.data;
  } catch (error:any) {
    throw error.message;
  }
}