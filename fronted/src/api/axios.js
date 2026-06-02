import axios from "axios";

const api = axios.create({
  baseURL: "https://expensetracker-1-2xwd.onrender.com",
});

export default api;