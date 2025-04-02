import { Router } from "express";
import foodController from "../controller/food.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createFoodSchema, updateFoodSchema } from "../schema/food.schema.js";

const foodRouter = Router();

foodRouter
    .get("/", foodController.getAllFoods)
    .get("/:id", foodController.getOneFood)
    .post("/", ValidationMiddleware(createFoodSchema), foodController.createFood)
    .put("/:id", ValidationMiddleware(updateFoodSchema), foodController.updateFood)
    .delete("/:id", foodController.deleteFood);

export default foodRouter;
