import { join } from "node:path";
import express from "express";
import router from "./route/index.js";
import { ErrorHandlerMiddleware } from "./middleware/error-handler.middleware.js";
import { BaseException } from "./exception/base.exception.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(join(process.cwd(), "uploads")));

app.use("/api", router);

app.all("/*", (req, res, next) => {
  try {
    throw new BaseException(
      `Given ${req.url} with method: ${req.method} not found`,
      404
    );
  } catch (error) {
    next(error);
  }
});

app.use(ErrorHandlerMiddleware);

export default app;
