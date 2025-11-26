import axios from "axios";

export const api = axios.create({
  baseURL: "https://blog-api-production-4be4.up.railway.app/api",
});
