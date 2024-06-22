import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const useAxios = () => {
  const navigate = useNavigate();
  const axiosInstance = useRef(axios.create()).current;
  const [, setIsRefreshing] = useState(false);
  const [failedRequests, setFailedRequests] = useState([]);

  const processQueue = (error, token = null) => {
    failedRequests.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    setFailedRequests([]);
  };

  const getNewAccessToken = async (refreshToken) => {
    setIsRefreshing(true);
    try {
      console.log("Attempting to refresh token...");
      const response = await axios.get("/token", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const { accessToken } = response.data;
      console.log("Token refreshed successfully:", accessToken);
      localStorage.setItem("accessToken", accessToken);
      // Update axiosInstance default headers
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      processQueue(null, accessToken);
      return accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
      processQueue(error, null);
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  const requestInterceptor = (config) => {
    console.log("Request interceptor called with config:", config);

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      navigate("/");
      return Promise.reject(new Error("No accessToken available"));
    }
    return config;
  };

  const responseInterceptor = async (error) => {
    console.log("Response interceptor called with error:", error);
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          console.log(
            "Attempting to refresh access token in response interceptor..."
          );
          const newAccessToken = await getNewAccessToken(refreshToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.error(
            "Error refreshing token in response interceptor:",
            error
          );
          navigate("/");
          return Promise.reject(error);
        }
      } else {
        navigate("/");
        return Promise.reject(new Error("No refreshToken available"));
      }
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      requestInterceptor,
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      responseInterceptor
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return axiosInstance;
};

export default useAxios;
