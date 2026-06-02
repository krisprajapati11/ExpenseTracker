import axios from "axios";

const api = axios.create({
  baseURL: "https://richly-stoning-dioxide.ngrok-free.dev/api",
});

export default api;