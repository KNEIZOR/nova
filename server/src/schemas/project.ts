import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/),
  description: z.string().trim().min(10).max(3000),
  city: z.string().trim().min(2).max(100),
  area: z.number().int().positive(),
  category: z.string().trim().min(2).max(100),
  image: z.string().trim().min(1).max(500),
  images: z.array(z.string().trim().min(1).max(500)).default([]),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});
