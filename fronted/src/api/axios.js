import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://expensetracker-1-2xwd.onrender.com/api",
});

export default api;