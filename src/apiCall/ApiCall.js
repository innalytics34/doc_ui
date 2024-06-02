import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://127.0.0.1:805/IEC";
const jwtToken = Cookies.get("token");
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwtToken}`,
  },
});

export const getFromAPI = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postToAPI = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};