import z from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Please enter your full name")
        .max(80, "Name must be at most 80 characters"),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z
        .string()
        .trim()
        .regex(/^(\+?\d[\d\s-]{6,17})?$/, "Please enter a valid phone number")
        .optional(),
    subject: z.string().min(1, "Please select a subject"),
    message: z
        .string()
        .trim()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be at most 1000 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export interface ContactFormState {
    success: boolean;
    message?: string;
    errors?: { field: string; message: string }[];
    values?: Record<string, string>;
}