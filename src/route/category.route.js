import { Router } from "express";
import categoryController from "../controller/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema.js";
import { ROLES } from "../constants/role.constants.js";

const categoryRouter = Router();

categoryRouter
  .get("/", 
    Protected(false), 
    Roles(ROLES.ALL), 
    categoryController.getAllCategories
  )
  .get("/:id", 
    Protected(false), 
    Roles(ROLES.ALL),
    categoryController.getOneCategory
  )
  .post(
    "/",
    Protected(true),
    Roles(ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN),
    ValidationMiddleware(createCategorySchema),
    categoryController.createCategory
  )
  .put(
    "/:id",
    Protected(true),
    Roles(ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN),
    ValidationMiddleware(updateCategorySchema),
    categoryController.updateCategory
  )
  .delete("/:id", 
    Protected(true),
    Roles(ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN),
    categoryController.deleteCategory);

export default categoryRouter;
