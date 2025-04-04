import { Router } from "express";
import orderController from "../controller/order.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createOrderSchema } from "../schema/order.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.constants.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  Protected(true),
  Roles(ROLES.ALL),
  ValidationMiddleware(createOrderSchema),
  orderController.createOrder
)
.get("/",
  Protected(true),
  Roles(ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN), 
  orderController.getAllOrders)

export default orderRouter;