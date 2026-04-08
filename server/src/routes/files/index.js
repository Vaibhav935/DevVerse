import { Router } from "express";
import * as fileControllers from "../../controllers/files/index.js";

const router = Router();

router.post("/create", fileControllers.createFile)
router.post("/rename", fileControllers.renameFile)

export default router