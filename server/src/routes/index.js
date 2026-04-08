import { Router } from "express";
import folderRoutes from "./folders/index.js"
import fileRoutes from "./files/index.js"
import authRoutes from "./auth/index.js"

const router = Router();

router.use("/folder", folderRoutes)
router.use("/file", fileRoutes)
router.use("/", authRoutes)

export default router;