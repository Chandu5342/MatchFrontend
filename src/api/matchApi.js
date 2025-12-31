import axios from "axios";

const API_URL = "http://localhost:5000/matches";

export const getMatches = async (params = {}) => {
  const res = await axios.get(API_URL, { params });
  return res.data;
};
