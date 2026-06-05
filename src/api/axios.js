// client/src/api/axios.js

import axios from "axios";

// create a custom axios instance
// everything that talks to our backend goes through this
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 15000, // 15 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request Interceptor ───────────────────────────────────────
//
// runs before every outgoing request
// reads the token from localStorage and attaches it
// so we never have to manually add auth headers anywhere

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────
//
// runs after every response comes back
// if we get a 401, it means the token expired or is invalid
// we clear localStorage and redirect to login

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // only redirect if not already on auth pages
      const publicPaths = ["/login", "/signup", "/"];
      if (!publicPaths.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;

