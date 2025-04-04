import { Router } from "express";
import foodController from "../controller/food.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createFoodSchema, updateFoodSchema } from "../schema/food.schema.js";
import { upload } from "../config/multer.config.js";
import { ROLES } from "../constants/role.constants.js";
import { Roles } from "../middleware/roles.middleware.js";

const foodRouter = Router();


foodRouter
  .get("/",
    Protected(false), 
    Roles(ROLES.ALL),  
    foodController.getAllFoods
  )
  .get("/:id", 
    Protected(false), 
    Roles(ROLES.ALL), 
    foodController.getOneFood
  )
  .post(
    "/",
    Protected(true), 
    Roles(ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN), 
    upload.single("image"),
    ValidationMiddleware(createFoodSchema),
    foodController.createFood
  )
  .patch(
    Protected(true), 
    Roles(ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN), 
    "/:id",
    ValidationMiddleware(updateFoodSchema),
    foodController.updateFood
  )
  .delete("/:id", 
    Protected(true), 
    Roles(ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN),
    foodController.deleteFood
  );

export default foodRouter;