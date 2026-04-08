import fs from "fs";
import { customError, success } from "../../utils/response.utils.js";
import path from "path";

export const createFile = async (req, res) => {
  try {
    const { fileName, data } = req.body;
    const currentPath = process.cwd();

    const filePath = path.join(currentPath, "assets", fileName);

    // try {
    //   await fs.access(filePath);
    //   return customError(res, 500, {}, "File already exists");
    // } catch {}

    fs.writeFile(filePath, data, (err) => {
      if (err) {
        return customError(res, 500, {}, "Error in creating file", error);
      }
      return success(res, {}, "File created successfully");
    });
  } catch (error) {}
};

export const readFile = async (req, res) => {};

export const renameFile = async (req, res) => {
  try {
    const { oldFileName, newFileName } = req.body;

    const currentPath = process.cwd();
    const oldFilePath = path.join(currentPath, "assets", oldFileName);
    const newFilePath = path.join(currentPath, "assets", newFileName);

    fs.rename(oldFilePath, newFilePath);

    return success(res, {}, "File renamed");
  } catch (error) {
    console.log(error);
    return customError(res, 500, {}, "Error in renaming file.", error);
  }
};
