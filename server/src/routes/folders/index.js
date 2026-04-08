import { Router } from "express";
import * as folderController from "../../controllers/folders/index.js";

const router = Router();

router.post("/create", folderController.createFolder);
router.get("/read", folderController.readFolder);
router.delete("/delete", folderController.deleteFolder);
router.put("/update", folderController.updateFolder);


export default router;
