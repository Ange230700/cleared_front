// src\axios-interceptor.ts
import api from "~/src/axios-instance";
import router from "~/src/router";

const REFRESH_URL = "/api/auth/refresh/";

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const resp = error.response;
    const originalRequest = error.config;

    if (resp?.status === 401 && originalRequest.url === REFRESH_URL) {
      router.push("/login");
      return Promise.reject(new Error(error.message));
    }

    const isAccessTokenExpired =
      resp?.status === 401 &&
      resp.data?.code === "token_not_valid" &&
      resp.data?.detail?.[0]?.token_class === "AccessToken";

    if (isAccessTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post(REFRESH_URL, {}, { withCredentials: true });
        return api(originalRequest);
      } catch {
        router.push("/login");
        return Promise.reject(new Error(error.message));
      }
    }

    return Promise.reject(new Error(error.message));
  },
);
