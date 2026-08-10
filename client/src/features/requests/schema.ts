import { z } from 'zod';

export const requestFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Введите имя')
        .max(100, 'Имя слишком длинное'),

    phone: z
        .string()
        .trim()
        .min(5, 'Введите номер телефона')
        .max(30, 'Номер телефона слишком длинный'),

    area: z
        .string()
        .optional()
        .refine(
            (value) => {
                if (!value || value.trim() === '') {
                    return true;
                }

                const number = Number(value);

                return (
                    Number.isInteger(number) && number > 0 && number <= 10000
                );
            },
            {
                message: 'Введите площадь от 1 до 10000 м²',
            },
        ),

    service: z.string().trim().min(1, 'Выберите услугу'),

    comment: z
        .string()
        .trim()
        .max(2000, 'Комментарий слишком длинный')
        .optional(),
});

export type RequestFormValues = z.infer<typeof requestFormSchema>;
