import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as authController from "./auth.controller.js";
const router = Router();

// register

router.post("/register", asyncHandler(authController.register));

// login

router.post("/login", asyncHandler(authController.login));

export default router;