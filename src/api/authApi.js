import axios from "axios";

const API_URL = "http://localhost:5000/auth";
//const API_URL = "https://matchbackend.onrender.com/auth";
export const registerUser = async (data) => {
  return await axios.post(`${API_URL}/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/login`, data);
};
