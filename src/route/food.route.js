import { Router } from "express";
import foodController from "../controller/food.controller.js";

const foodRouter = Router();

foodRouter
    .get("/", foodController.getAllFoods)
    .get("/:id", foodController.getOneFood)
    .post("/", foodController.createFood)
    .put("/:id", foodController.updateFood)
    .delete("/:id", foodController.deleteFood);

export default foodRouter;
