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
      return Promise.reject(new Error(env.error?.message ?? "Backend error."));
    }
  },
  (error) => {
    // If error is already an Error instance, just pass it through.
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    // Otherwise, wrap it.
    return Promise.reject(
      new Error(typeof error === "string" ? error : JSON.stringify(error)),
    );
  },
);

export default api;
