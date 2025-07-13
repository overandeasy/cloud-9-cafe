import * as z from 'zod/v4'

export const signUpFormSchema = z.object({

    // ...existing code...

    firstName: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name must be at most 50 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),

    lastName: z
        .string()
        .min(1, "Last name is required")
        .max(50, "Last name must be at most 50 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),

    // ...existing code...

    // username: z
    //     .string()
    //     .min(3, "Username must be at least 3 characters long")
    //     .max(20, "Username must be at most 20 characters long")
    //     .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

    email: z.email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.")
        .max(100, "Password must be at most 100 characters")
        .regex(/[a-z]/, "Must include a lowercase letter")
        .regex(/[A-Z]/, "Must include an uppercase letter")
        .regex(/[0-9]/, "Must include a number")
        .regex(/[^a-zA-Z0-9]/, "Must include a special character"),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],

    });


export const signInFormSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});


export type signUpFormData = z.infer<typeof signUpFormSchema>
export type signInFormData = z.infer<typeof signInFormSchema>