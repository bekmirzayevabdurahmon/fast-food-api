import { Router } from "express";
import categoryController from "../controller/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { Protected } from "../middleware/protected.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema.js";
import { Roles } from "../middleware/roles.middleware.js";

const categoryRouter = Router();

categoryRouter
  .get("/", Protected(false), categoryController.getAllCategories)
  .get("/:id", Protected(false), categoryController.getOneCategory)
  .post(
    "/",
    Protected(true),
    Roles("VIEWER"),
    ValidationMiddleware(createCategorySchema),
    categoryController.createCategory
  )
  .put(
    "/:id",
    Protected(true),
    ValidationMiddleware(updateCategorySchema),
    categoryController.updateCategory
  )
  .delete("/:id", Protected(true), categoryController.deleteCategory);

export default categoryRouter;
