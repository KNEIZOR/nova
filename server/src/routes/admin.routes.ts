import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { serviceSchema } from "../schemas/service.js";
import { projectSchema } from "../schemas/project.js";
import { reviewSchema } from "../schemas/review.js";
import { requestStatusSchema } from "../schemas/request.js";

const router = Router();

router.use(requireAuth);

router.get("/dashboard", async (_req, res, next) => {
  try {
    const [services, projects, reviews, requests, newRequests] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.review.count(),
      prisma.request.count(),
      prisma.request.count({ where: { status: "NEW" } })
    ]);

    res.json({ services, projects, reviews, requests, newRequests });
  } catch (error) {
    next(error);
  }
});

// Services
router.get("/services", async (_req, res, next) => {
  try {
    res.json(await prisma.service.findMany({ orderBy: { sortOrder: "asc" } }));
  } catch (error) {
    next(error);
  }
});

router.post("/services", async (req, res, next) => {
  try {
    const data = serviceSchema.parse(req.body);
    res.status(201).json(await prisma.service.create({ data }));
  } catch (error) {
    next(error);
  }
});

router.patch("/services/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      res.status(400).json({ message: "Некорректный id" });
      return;
    }

    const data = serviceSchema.partial().parse(req.body);
    res.json(await prisma.service.update({ where: { id }, data }));
  } catch (error) {
    next(error);
  }
});

router.delete("/services/:id", async (req, res, next) => {
  try {
    await prisma.service.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Projects
router.get("/projects", async (_req, res, next) => {
  try {
    res.json(await prisma.project.findMany({ orderBy: { sortOrder: "asc" } }));
  } catch (error) {
    next(error);
  }
});

router.post("/projects", async (req, res, next) => {
  try {
    const data = projectSchema.parse(req.body);
    res.status(201).json(await prisma.project.create({ data }));
  } catch (error) {
    next(error);
  }
});

router.patch("/projects/:id", async (req, res, next) => {
  try {
    const data = projectSchema.partial().parse(req.body);
    res.json(await prisma.project.update({ where: { id: Number(req.params.id) }, data }));
  } catch (error) {
    next(error);
  }
});

router.delete("/projects/:id", async (req, res, next) => {
  try {
    await prisma.project.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Reviews
router.get("/reviews", async (_req, res, next) => {
  try {
    res.json(await prisma.review.findMany({ orderBy: { sortOrder: "asc" } }));
  } catch (error) {
    next(error);
  }
});

router.post("/reviews", async (req, res, next) => {
  try {
    const data = reviewSchema.parse(req.body);
    res.status(201).json(await prisma.review.create({ data }));
  } catch (error) {
    next(error);
  }
});

router.patch("/reviews/:id", async (req, res, next) => {
  try {
    const data = reviewSchema.partial().parse(req.body);
    res.json(await prisma.review.update({ where: { id: Number(req.params.id) }, data }));
  } catch (error) {
    next(error);
  }
});

router.delete("/reviews/:id", async (req, res, next) => {
  try {
    await prisma.review.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Requests
router.get("/requests", async (req, res, next) => {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;

    const requests = await prisma.request.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: { createdAt: "desc" }
    });

    res.json(requests);
  } catch (error) {
    next(error);
  }
});

router.get("/requests/:id", async (req, res, next) => {
  try {
    const request = await prisma.request.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!request) {
      res.status(404).json({ message: "Заявка не найдена" });
      return;
    }

    res.json(request);
  } catch (error) {
    next(error);
  }
});

router.patch("/requests/:id/status", async (req, res, next) => {
  try {
    const { status } = requestStatusSchema.parse(req.body);

    res.json(
      await prisma.request.update({
        where: { id: Number(req.params.id) },
        data: { status }
      })
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/requests/:id", async (req, res, next) => {
  try {
    await prisma.request.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
