import express from "express";
import * as authController from "../../controllers/auth/index.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getMe);
router.get("/refresh", authMiddleware, authController.refreshToken);

export default router;
