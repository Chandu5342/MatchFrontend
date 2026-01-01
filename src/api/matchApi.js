import axios from "axios";

const API_URL = "http://localhost:5000/matches";

export const getMatches = async (params = {}) => {
  const res = await axios.get(API_URL, { params });
  return res.data;
};

export const createMatch = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateMatch = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteMatch = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
