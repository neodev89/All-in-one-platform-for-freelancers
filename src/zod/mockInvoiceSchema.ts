import z from "zod";

const ratingSchema = z.object({
    rate: z.number().nonnegative(),
    count: z.number().nonnegative(),
});

export const mockInvoiceSchema = z.object({
    id: z.number(),
    title: z.string().nonempty(),
    price: z.number().nonnegative(),
    description: z
        .string()
        .min(10, "minimo 10 caratteri")
        .max(2000, "massimo 2000 caratteri"),
    category: z.string().nonempty(),
    image: z.string(),
    rating: ratingSchema,
});

export type mockInvoiceType = z.infer<typeof mockInvoiceSchema>;
