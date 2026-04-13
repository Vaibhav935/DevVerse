import axiosInstance from "../../config/axiosInstance";
import asyncHandler from "../../utils/asyncHandler";

export const geminiApi = async (prompt) => {
  const response = await axiosInstance.get(`/api/v1/ai/gemini/c/${prompt}`);
  return response?.data;
};

export const hfApi = async (prompt) => {
  const response = await axiosInstance.get(`/api/v1/ai/hf/c/${prompt}`);
  return response?.data;
};
