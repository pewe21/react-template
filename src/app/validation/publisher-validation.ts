import { z } from "zod"

export class PublisherValidation {
    static readonly CREATE = z.object({
        name: z.string().min(5, {
            message: 'Name must be at least 5 characters'
        }).max(50, {
            message: 'Name must be at most 50 characters'
        }).transform(value => value.toUpperCase()),
    })

    static readonly EDIT = z.object({
        name: z.string().min(5, {
            message: 'Name must be at least 5 characters'
        }).max(50, {
            message: 'Name must be at most 50 characters'
        }),
    })
}