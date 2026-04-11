import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Service to automatically refresh token

// response means form backend to frontend me check karega
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      error.response?.statusCode == 401 &&
      error.response.message === "Invalid access token"
    ) {
      const newAccessToken = "generatedtoken";
      console.log(error);
    }

    if (
      error.response?.statusCode === 401 &&
      error.response.message === "Authentication invalid"
    ) {
      window.location.href = "/login";
      console.log(error);
    }
  },
);

// request means from frontend to backend me check krna

export default axiosInstance;
