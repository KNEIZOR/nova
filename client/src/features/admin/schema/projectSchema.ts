import { z } from 'zod';

export const projectFormSchema = z.object({
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

    description: z
        .string()
        .trim()
        .min(10, 'Минимум 10 символов')
        .max(3000, 'Максимум 3000 символов'),

    city: z
        .string()
        .trim()
        .min(2, 'Минимум 2 символа')
        .max(100, 'Максимум 100 символов'),

    area: z
        .number()
        .int('Площадь должна быть целым числом')
        .positive('Площадь должна быть больше 0'),

    category: z
        .string()
        .trim()
        .min(2, 'Минимум 2 символа')
        .max(100, 'Максимум 100 символов'),

    image: z
        .string()
        .trim()
        .min(1, 'Укажите главное изображение')
        .max(500, 'Максимум 500 символов'),

    images: z.array(
        z
            .string()
            .trim()
            .min(1, 'URL не может быть пустым')
            .max(500, 'Максимум 500 символов'),
    ),

    isPublished: z.boolean(),

    sortOrder: z.number().int(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
