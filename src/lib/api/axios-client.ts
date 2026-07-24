import { useAuthStore } from "@/features/auth/store/auth.store";
import { queryClient } from "@/lib/tanstack-query/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosClient = axios.create({
  baseURL: BASE_URL
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (
      error?.response?.status === 401
    ) {
      localStorage.removeItem("token");
      useAuthStore.getState().setUser(null);
      queryClient.clear();
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
)
