import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as taskController from "./task.controller.js";
import { isAuthenticated } from "../../middlewares/authentication.middleware.js";
const router = Router();

// add task
router.post("/", isAuthenticated, asyncHandler(taskController.addTask));

// get task

router.get("/tasks", isAuthenticated, asyncHandler(taskController.getTask));

// update task
router.patch("/:id", isAuthenticated, asyncHandler(taskController.updateTask));

// delete task
router.delete("/:id", isAuthenticated, asyncHandler(taskController.deleteTask));

export default router;
