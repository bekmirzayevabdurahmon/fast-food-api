import { Router } from "express";
import userController from "../controller/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.constants.js";
import {
  loginSchema,
  refreshSchema,
  registerSchema,
} from "../schema/user.schema.js";
import { Protected } from "../middleware/protected.middleware.js";

const userRouter = Router();

userRouter
  .get("/", 
    Roles(ROLES.RESTAURANT_OWNER, ROLES.SUPER_ADMIN),
    userController.getAllUsers)
  .post(
    "/register",
    Protected(false),
    Roles(ROLES.ALL),
    ValidationMiddleware(registerSchema),
    userController.register
  )
  .post("/login", 
    Protected(false),
    Roles(ROLES.ALL),
    ValidationMiddleware(loginSchema), 
    userController.login)
  .post(
    "/refresh",
    Protected(false),
    Roles(ROLES.ALL),
    ValidationMiddleware(refreshSchema),
    userController.refresh
  );

export default userRouter;
