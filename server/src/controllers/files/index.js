import fs from "fs";
import { customError, success } from "../../utils/response.utils.js";
import path from "path";

export const createFile = async (req, res) => {
  const { name: fileName, path: folderPath, data = "" } = req.body;

  console.log(req.body);
  // const currentPath = process.cwd();

  const filePath = path.join(folderPath, fileName);

  // try {
  //   await fs.access(filePath);
  //   return customError(res, 500, {}, "File already exists");
  // } catch {}

  //   const fs = require('fs');
  // fs.appendFile('log.txt', 'New log entry\n', (err) => {
  //   if (err) throw err;
  //   console.log('Content appended (or file created)!');
  // });

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      return customError(res, 500, {}, err.message, err);
    }
    return success(res, {}, "File created successfully");
  });
};

export const readFile = async (req, res) => {
  const { fileName } = req.body;

  if (!fileName) {
    return customError(res, 400, {}, "File name is required");
  }

  const currentPath = process.cwd();
  const filePath = path.join(currentPath, "assets", fileName);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return customError(res, 500, {}, err.message, err);
    }
    return success(res, data, "File read successfully.");
  });
};

export const renameFile = async (req, res) => {
  const { oldFileName, newFileName } = req.body;

  const currentPath = process.cwd();
  const oldFilePath = path.join(currentPath, "assets", oldFileName);
  const newFilePath = path.join(currentPath, "assets", newFileName);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      return customError(res, 500, {}, err.message, err);
    }

    return success(res, {}, "File renamed");
  });
};

export const deleteFile = async (req, res) => {
  const { fileName } = req.body;

  if (!fileName) {
    return customError(res, 400, {}, "File name is required");
  }

  const currentPath = process.cwd();
  const filePath = path.join(currentPath, "assets", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      return customError(res, 500, err.message, err);
    }
    return success(res, {}, "File deleted successfully");
  });
};
