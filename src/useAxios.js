import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAxios = () => {
  const navigate = useNavigate();
  const axiosInstance = axios.create();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
              try {
                const response = await axios.post(
                  "/token",
                  { refreshToken },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                accessToken = response.data.accessToken;
                localStorage.setItem("accessToken", accessToken);
                config.headers["Authorization"] = `Bearer ${accessToken}`;
              } catch (error) {
                console.error("Error refreshing token:", error);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/");
                return Promise.reject(error);
              }
            } else {
              localStorage.removeItem("accessToken");
              navigate("/");
              return Promise.reject(new Error("No refreshToken available"));
            }
          } else {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
        } else {
          navigate("/");
          return Promise.reject(new Error("No accessToken available"));
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return axiosInstance;
};

export default useAxios;
