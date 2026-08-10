import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/),
  shortDescription: z.string().trim().min(10).max(500),
  description: z.string().trim().min(10).max(3000),
  priceFrom: z.number().int().nonnegative().nullable().optional(),
  image: z.string().trim().max(500).nullable().optional(),
  features: z.array(z.string().trim().min(1).max(200)).default([]),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});
