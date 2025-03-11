import { ZodType, z } from 'zod';

export class BookValidation {
    static readonly CREATE: ZodType = z.object({
        code: z.string().length(5, {
            message: 'Code must be 5 characters'
        }),
        title: z.string().min(5, {
            message: 'Title must be at least 5 characters'
        }).max(50, {
            message: 'Title must be at most 50 characters'
        }),
        desc: z.string(),
    })

    static readonly EDIT: ZodType = z.object({
        code: z.string(),
        title: z.string().min(5, {
            message: 'Title must be at least 5 characters'
        }).max(50, {
            message: 'Title must be at most 50 characters'
        }),
        desc: z.string(),
    })
}