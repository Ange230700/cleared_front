// src\axios-instance.ts

import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    const env = response.data;
    if (env?.status === "success") {
      return { ...response, data: env.data };
    } else {
      return Promise.reject(new Error(env.error?.message || "Backend error."));
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
