import fs from "fs";
import path from "path";
import { customError, success } from "../../utils/response.utils.js";
import crypto from "crypto";

const generateId = (input) =>
  crypto.createHash("md5").update(input).digest("hex");

const buildTree = (dirPath) => {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  return files.map((file) => {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory()) {
      return {
        id: generateId(fullPath),
        path: fullPath,
        name: file.name,
        type: "folder",
        children: buildTree(fullPath) || [],
      };
    }

    return {
      id: generateId(fullPath),
      name: file.name,
      type: "file",
      path: fullPath,
      chacha: "ddkdkd",
    };
  });
};

export const createFolder = async (req, res) => {
  const { path: rootPath, name: folderName } = req.body;
  // const rootPath = path.resolve() + "/assets/root";

  try {
    fs.mkdir(`${rootPath}/${folderName}`, { recursive: true }, (err) => {
      if (err) {
        return customError(res, 500, {}, err.message, err);
      } else {
        return success(res, {}, "Folder created successfully");
      }
    });
  } catch (error) {
    console.log("error in createing folder", error);
  }
};

export const readFolder = async (req, res) => {
  const rootPath = path.resolve() + "/assets/root";

  fs.readdir(`${rootPath}`, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log("rror aa gaya -> ", err);
      return customError(res, 500, {}, err.message, err);
    } else {
      const tree = buildTree(rootPath);
      return success(res, tree, "Folder contents retrieved successfully");
    }
  });
};

export const deleteFolder = async (req, res) => {
  const { path: folderName } = req.query;
  // const currentDir = path.resolve() + "/assets/root";

  fs.rm(folderName, { recursive: true }, (err) => {
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
