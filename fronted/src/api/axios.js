import axios from "axios";

const api = axios.create({
  baseURL: "https://expensetracker-2-fiaf.onrender.com/api",
});

export default api;