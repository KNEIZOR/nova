import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

type JwtPayload = {
  adminId: number;
};

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken;

  if (!token) {
    res.status(401).json({ message: "Требуется авторизация" });
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.adminId = payload.adminId;
    next();
  } catch {
    res.status(401).json({ message: "Недействительная сессия" });
  }
}
