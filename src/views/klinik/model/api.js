import axios from "axios";

const API_URL = "https://backend-isenafktp.onrender.com/pasiens";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getPasiens = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching pasiens:", error);
    throw new Error("Failed to fetch pasiens. Please try again later.");
  }
};

export const createPasien = async (pasienData) => {
  try {
    const response = await api.post("/", pasienData);
    return response.data;
  } catch (error) {
    console.error("Error creating pasien:", error);
    throw new Error("Failed to create pasien. Please try again later.");
  }
};

export const updatePasien = async (pasienId, pasienData) => {
  try {
    const response = await api.put(`/${pasienId}`, pasienData);
    return response.data;
  } catch (error) {
    console.error("Error updating pasien:", error);
    throw new Error("Failed to update pasien. Please try again later.");
  }
};

export const deletePasien = async (pasienId) => {
  try {
    const response = await api.delete(`/${pasienId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting pasien:", error);
    throw new Error("Failed to delete pasien. Please try again later.");
  }
};
