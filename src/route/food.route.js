import { Router } from "express";
import foodController from "../controller/food.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createFoodSchema, updateFoodSchema } from "../schema/food.schema.js";
import { upload } from "../config/multer.config.js";

const foodRouter = Router();

foodRouter
  .get("/", foodController.getAllFoods)
  .get("/:id", foodController.getOneFood)
  .post(
    "/",
    upload.single("image"),
    ValidationMiddleware(createFoodSchema),
    foodController.createFood
  )
  .patch(
    "/:id",
    ValidationMiddleware(updateFoodSchema),
    foodController.updateFood
  )
  .delete("/:id", foodController.deleteFood);

export default foodRouter;