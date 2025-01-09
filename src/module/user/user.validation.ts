import { z } from 'zod';

const userValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        email: z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email' }),
        password: z.string({ required_error: 'Password is required' }),
        role: z.enum(['admin', 'user']).default('user'),
        isBlocked: z.boolean().default(false),
    }),
});

export const UserValidation = {
    userValidationSchema,
};
