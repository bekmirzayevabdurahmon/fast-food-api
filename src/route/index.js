import { Router } from "express";
import categoryRouter from "./category.route.js";
import foodRouter from "./food.route.js";

const router = Router();

router.use("/categories", categoryRouter)
router.use("/foods", foodRouter)

export default router;