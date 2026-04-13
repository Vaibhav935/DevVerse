import axiosInstance from "../../config/axiosInstance";
import asyncHandler from "../../utils/asyncHandler";

export const createFolderApi = asyncHandler(async (data) => {
  const response = await axiosInstance.post("/api/v1/folder/create", data);
  return response?.data;
});

export const renameFolderApi = asyncHandler(async (data) => {
  const response = await axiosInstance.put("/api/v1/folder/update", data);
  return response?.data;
});

export const readFolderApi = asyncHandler(async (data) => {
  const response = await axiosInstance.get("/api/v1/folder/read", data);
  return response?.data;
});

export const deleteFolderApi = asyncHandler(async (data) => {
  const response = await axiosInstance.delete("/api/v1/folder/delete", data);
  return response?.data;
});
