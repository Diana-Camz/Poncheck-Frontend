import { z } from 'zod';

export const signUpSchema = z.object({
    username: z.string(),
    password: z.string().min(6, "La contrasena es obligatoria"),
    confirmPassword: z.string().min(6, "Se requiere confirmar contrasena")
}).refine(
    (data) => data.password === data.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"]
}
);

export const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(3, "La contrasena es obligatoria"),
});

export type SignUp = z.infer<typeof signUpSchema>

export type Login = z.infer<typeof loginSchema>