import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// Create a setter so we can inject Clerk's getToken from outside
let getTokenFn = null;

export const setGetToken = (fn) => {
  getTokenFn = fn;
};

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// Attach Clerk token to every request
axiosInstance.interceptors.request.use(async (config) => {
  if (getTokenFn) {
    const token = await getTokenFn();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
