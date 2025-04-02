import { Router } from "express";
import categoryController from "../controller/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema.js";

const categoryRouter = Router();

categoryRouter
  .get("/", categoryController.getAllCategories)
  .get("/:id", categoryController.getOneCategory)
  .post(
    "/",
    ValidationMiddleware(createCategorySchema),
    categoryController.createCategory
  )
  .put(
    "/:id",
    ValidationMiddleware(updateCategorySchema),
    categoryController.updateCategory
  )
  .delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
