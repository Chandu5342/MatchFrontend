import axios from "axios";

const API_URL = "http://localhost:5000/favorites";

export const getFavorites = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addFavorite = async (matchId) => {
  const res = await axios.post(`${API_URL}/${matchId}`);
  return res.data;
};

export const removeFavorite = async (matchId) => {
  const res = await axios.delete(`${API_URL}/${matchId}`);
  return res.data;
};
