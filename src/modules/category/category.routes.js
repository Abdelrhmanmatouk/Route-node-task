import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as categoryController from "./category.controller.js";
import { isAuthenticated } from "../../middlewares/authentication.middleware.js";
const router = Router();

// add category

router.post("/", isAuthenticated, asyncHandler(categoryController.addCategory));

// update category
router.patch("/:id",isAuthenticated,asyncHandler(categoryController.updateCategory));

// delete category
router.delete("/:id",isAuthenticated,asyncHandler(categoryController.deleteCategory));

// get categories

router.get("/categories",isAuthenticated,asyncHandler(categoryController.getCategories));

export default router;
