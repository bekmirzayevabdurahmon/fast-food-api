import { Router } from "express";
import orderController from "../controller/order.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createOrderSchema } from "../schema/order.schema.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  ValidationMiddleware(createOrderSchema),
  orderController.createOrder
)
.get("/", orderController.getAllOrders)

export default orderRouter;