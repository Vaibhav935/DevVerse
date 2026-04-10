import { Router } from "express";
import * as aiControllers from "../../controllers/ai/index.js";

const router = Router();

router.get("/c/:prompt", aiControllers.chat);
router.get("/gemini/c/:prompt", aiControllers.Gchat)

export default router;
