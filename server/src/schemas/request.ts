import { z } from 'zod';

export const createRequestSchema = z.object({
    name: z.string().trim().min(2).max(100),
    phone: z
        .string()
        .trim()
        .min(5, 'Введите номер телефона')
        .max(30, 'Номер телефона слишком длинный')
        .regex(/^\+?[0-9\s()-]+$/, 'Введите корректный номер телефона'),
    area: z.number().int().positive().max(10000).nullable().optional(),
    service: z.string().trim().min(1).max(100),
    comment: z.string().trim().max(2000).optional(),
});

export const requestStatusSchema = z.object({
    status: z.enum(['NEW', 'IN_PROGRESS', 'COMPLETED', 'REJECTED']),
});
