import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Buat instance axios
const axiosJWT = axios.create({
  baseURL: "https://be-isena-fktp.onrender.com",
  withCredentials: true,
});

// Tambahkan interceptor
axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        try {
          const response = await axios.get("/token");
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.error("Error refreshing token:", error);
          useNavigate().push("/"); // Redirect to login page
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
