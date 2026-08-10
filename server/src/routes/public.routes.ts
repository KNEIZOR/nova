import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { createRequestSchema } from "../schemas/request.js";

const router = Router();

router.get("/services", async (_req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" }
    });
    res.json(services);
  } catch (error) {
    next(error);
  }
});

router.get("/projects", async (_req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" }
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/reviews", async (_req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" }
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/requests", async (req, res, next) => {
  try {
    const data = createRequestSchema.parse(req.body);
    const request = await prisma.request.create({ data });
    res.status(201).json({
      id: request.id,
      message: "Заявка успешно отправлена"
    });
  } catch (error) {
    next(error);
  }
});

export default router;
