import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";
import { loginSchema } from "../schemas/auth.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const admin = await prisma.admin.findUnique({ where: { email: data.email } });

    if (!admin || !(await bcrypt.compare(data.password, admin.passwordHash))) {
      res.status(401).json({ message: "Неверный email или пароль" });
      return;
    }

    const accessToken = jwt.sign({ adminId: admin.id }, env.JWT_SECRET, { expiresIn: "2h" });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000
    });

    res.json({
      id: admin.id,
      email: admin.email
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("accessToken");
  res.status(204).send();
});

router.get("/me", requireAuth, async (req, res) => {
  const admin = await prisma.admin.findUnique({
    where: { id: req.adminId },
    select: { id: true, email: true }
  });

  if (!admin) {
    res.status(401).json({ message: "Администратор не найден" });
    return;
  }

  res.json(admin);
});

export default router;
