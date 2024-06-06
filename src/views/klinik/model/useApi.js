import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "https://backend-isenafktp.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fungsi untuk menavigasi ke halaman login
const redirectToLogin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  navigate("/");
};

// Interceptor request untuk menambahkan header Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log("Access Token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response untuk menangani token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("Refresh Token:", refreshToken);
        if (refreshToken) {
          originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
          console.log("Retrying original request with new access token...");
          try {
            const response = await api(originalRequest);
            console.log("Response from retrying original request:", response);
            // Jika permintaan berhasil dengan token akses yang baru
            if (response && response.data && response.data.accessToken) {
              // Ambil token akses yang baru dari respons
              const newAccessToken = response.data.accessToken;
              // Simpan token akses yang baru ke localStorage
              localStorage.setItem("accessToken", newAccessToken);
              console.log("New Access Token:", newAccessToken);
            }
            // Melanjutkan permintaan asli setelah memperbarui token akses
            return response;
          } catch (error) {
            console.error("Error retrying original request:", error);
            throw error;
          }
        } else {
          console.log(
            "Refresh token not available. Redirecting to login page..."
          );
          redirectToLogin();
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
        return Promise.reject(err);
      }
    }
    console.error("Error response from server:", error.response);
    return Promise.reject(error);
  }
);

// Fungsi untuk membuat pasien dengan menggunakan interceptor
export const createPasients = async (data) => {
  const token = localStorage.getItem("accessToken");
  const response = await api.post("/pasiens", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fungsi untuk mendapatkan daftar pasien dengan menggunakan interceptor
export const getPasients = async () => {
  try {
    const response = await api.get("/pasiens");
    console.log("Get Pasients Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error getting patients:", error);
    throw error;
  }
};

export default api;
