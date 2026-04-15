import fs from "fs";
import path from "path";
import { customError, success } from "../../utils/response.utils.js";

const buildTree = (dirPath) => {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  return files.map((file) => {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory()) {
      return {
        id: "",
        path: fullPath,
        name: file.name,
        type: "folder",
        children: buildTree(fullPath) || [],
      };
    }

    return {
      id: "",
      name: file.name,
      type: "file",
      path: fullPath,
      chacha: "ddkdkd",
    };
  });
};

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
  const rootPath = path.resolve() + "/assets/";

  console.log("req aai");

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
