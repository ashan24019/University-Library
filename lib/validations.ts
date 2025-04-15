import { z } from "zod";

export const signUpSchema = z.object(shape:{
    fullName: z.string().min(minLength:3),
    email: z.string().email(),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty("University Card is required"),
    password: z.string().min(minLength:8),
});

export const signUpSchema = z.object(shape:{
    email: z.string().email(),
    password: z.string().min(minLength: 8),
})