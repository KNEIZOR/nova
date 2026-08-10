import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Некорректные данные",
      errors: error.issues
    });
    return;
  }

  res.status(500).json({ message: "Внутренняя ошибка сервера" });
};
