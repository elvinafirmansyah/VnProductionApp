import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const TOKEN = localStorage.getItem("SPONSORAPI_TOKEN");

  config.headers.Authorization = `Bearer ${TOKEN}`;

  // Bearer Token

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = 'multipart/data';
  }

  return config;
})

export default api;