import { Router } from "express";
import foodController from "../controller/food.controller.js";

const foodRouter = Router();

foodRouter
    .get("/", foodController.getAllFoods)
    .post("/", foodController.createFood)

export default foodRouter;
