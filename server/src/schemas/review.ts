import { z } from "zod";

export const reviewSchema = z.object({
  author: z.string().trim().min(2).max(100),
  text: z.string().trim().min(10).max(2000),
  object: z.string().trim().max(200).nullable().optional(),
  rating: z.number().int().min(1).max(5).default(5),
  image: z.string().trim().max(500).nullable().optional(),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});
