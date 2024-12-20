import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gym-backend-lake.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
