import axiosInstance from "../../config/axiosInstance";
import asyncHandler from "../../utils/asyncHandler";

export const createFileApi = async (body) => {
  try {
    const response = await axiosInstance.post("/api/v1/file/create", body);
    return response?.data;
  } catch (error) {
    console.log("error in create file api,", error);
  }
};

export const renameFileApi = asyncHandler(async (body) => {
  const response = axiosInstance.post("/api/v1/file/rename", data);
  return response?.data;
});

export const readFileApi = asyncHandler(async (body) => {
  const response = axiosInstance.post("/api/v1/file/read", data);
  return response?.data;
});

export const deleteFileApi = asyncHandler(async () => {
  const response = axiosInstance.delete("api/v1/file/delete");
  return response?.data;
});
