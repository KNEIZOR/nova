import { z } from 'zod';

export const serviceFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, 'Минимум 2 символа')
        .max(120, 'Максимум 120 символов'),

    slug: z
        .string()
        .trim()
        .min(2, 'Минимум 2 символа')
        .max(120, 'Максимум 120 символов')
        .regex(/^[a-z0-9-]+$/, 'Только lowercase, цифры и дефисы'),

    shortDescription: z
        .string()
        .trim()
        .min(10, 'Минимум 10 символов')
        .max(500, 'Максимум 500 символов'),

    description: z
        .string()
        .trim()
        .min(10, 'Минимум 10 символов')
        .max(3000, 'Максимум 3000 символов'),

    priceFrom: z.number().int().nonnegative().nullable(),

    image: z.string().trim().max(500).nullable(),

    features: z.array(z.string().trim().min(1)),

    isActive: z.boolean(),

    sortOrder: z.number().int(),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;
