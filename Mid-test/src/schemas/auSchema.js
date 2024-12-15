import * as z from "zod";

export const registerForm = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(6).max(225),
    confirm: z.string().trim().min(6).max(225),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Mật khẩu không đúng",
    path: ["confirm"],
  });

export const loginForm = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6).max(225).trim(),
});
