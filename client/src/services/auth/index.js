import axiosInstance from "../../config/axiosInstance";
import asyncHandler from "../../utils/asyncHandler";

export const registerApi = asyncHandler(async (data) => {
  const response = await axiosInstance.post(
    "http://localhost:5000/api/v1/register",
    data,
    {
      withCredentials: true,
    },
  );
  return response?.data;
});

export const loginApi = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/login", data, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("error in login api");
  }
};

export const refreshTokenApi = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/refresh");
    return response?.data;
  } catch (error) {
    console.log("error in refresh api");
  }
};

export const logoutApi = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/logout", {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("error in logout api", error);
  }
};

export const getMeApi = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/me", {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("error in getme api", error);
  }
};
