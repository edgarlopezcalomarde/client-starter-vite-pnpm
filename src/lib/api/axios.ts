import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../config";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      document.cookie = "";
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
