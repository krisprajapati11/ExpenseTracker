import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7038/api",
});

export default api;