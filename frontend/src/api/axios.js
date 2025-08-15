// src/api/axios.js
import axios from "axios";
import { toast } from "react-toastify";

// Axios instance for protected requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_ADMIN,
  withCredentials: true, // ✅ always send cookies (refresh token stored in HTTP-only cookie)
});

// Separate instance for refresh token request (no Authorization header)
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_ADMIN,
  withCredentials: true,
});

// Request interceptor → attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor → handle 401 Unauthorized and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 && // handle expired access token
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint → backend reads HTTP-only cookie
        const res = await refreshApi.post("/refresh-token");

        // Store new access token
        localStorage.setItem("accessToken", res.data.accessToken);

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails → logout user
        toast.error("Session expired. Please log in again.", { autoClose: 3000 });
        localStorage.clear();
        window.location.href = "/admin/login"; // fallback redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
