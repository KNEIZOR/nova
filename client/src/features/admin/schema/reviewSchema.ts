import { z } from 'zod';

export const reviewFormSchema = z.object({
    author: z
        .string()
        .trim()
        .min(2, 'Минимум 2 символа')
        .max(100, 'Максимум 100 символов'),

    text: z
        .string()
        .trim()
        .min(10, 'Минимум 10 символов')
        .max(2000, 'Максимум 2000 символов'),

    object: z
        .string()
        .trim()
        .max(200, 'Максимум 200 символов')
        .optional()
        .or(z.literal('')),

    rating: z
        .number()
        .int('Рейтинг должен быть целым числом')
        .min(1, 'Минимальный рейтинг — 1')
        .max(5, 'Максимальный рейтинг — 5'),

    image: z
        .string()
        .trim()
        .max(500, 'Максимум 500 символов')
        .optional()
        .or(z.literal('')),

    isPublished: z.boolean(),

    sortOrder: z.number().int(),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
