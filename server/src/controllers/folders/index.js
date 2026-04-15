import fs from "fs";
import path from "path";
import { customError, success } from "../../utils/response.utils.js";

export const createFolder = async (req, res) => {
  const { folderName } = req.body;
  const currentDir = path.resolve() + "/assets/root";

  fs.mkdir(`${currentDir}/${folderName}`, { recursive: true }, (err) => {
    if (err) {
      return customError(res, 500, {}, err.message, err);
    } else {
      return success(res, {}, "Folder created successfully");
    }
  });
};

export const readFolder = async (req, res) => {
  const currentDir = path.resolve() + "/assets/";

  fs.readdir(`${currentDir}`, { withFileTypes: true }, (err, files) => {
    if (err) {
      return customError(res, 500, {}, err.message, err);
    } else {
      const result = files.map((file) => ({
        name: file.name,
        type: file.isDirectory() ? "folder" : "file",
        path: currentDir,
      }));
      return success(res, result, "Folder contents retrieved successfully");
    }
  });
};

export const deleteFolder = async (req, res) => {
  const { folderName } = req.query;
  const currentDir = path.resolve() + "/assets/root";

  fs.rm(`${currentDir}/${folderName}`, { recursive: true }, (err) => {
    if (err) {
      return customError(res, 500, {}, err.message, err);
    } else {
      return success(res, {}, "Folder deleted successfully");
    }
  });
};

export const updateFolder = async (req, res) => {
  const { oldFolderName, newFolderName } = req.body;
  const currentDir = path.resolve() + "/assets/root";

  fs.rename(
    `${currentDir}/${oldFolderName}`,
    `${currentDir}/${newFolderName}`,
    (err) => {
      if (err) {
        return customError(res, 500, {}, err.message, err);
      }
      return success(res, {}, "Folder renamed successfully");
    },
  );
};
