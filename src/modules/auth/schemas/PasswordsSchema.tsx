import { z } from "zod";

const PasswordSchema = z.string().min(8, {
  message: "Password must be at least 8 characters",
});

export const PasswordsSchema = z
  .object({
    password: PasswordSchema,
    repeatPassword: PasswordSchema,
  })
  // Check if passwords match
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  })
  // Check if password contains one lowercase character
  .refine((data) => /[a-z]/.test(data.password), {
    message: "Password must contain at least one lowercase letter",
    path: ["password"],
  })
  // Check if password contains one uppercase character
  .refine((data) => /[A-Z]/.test(data.password), {
    message: "Password must contain at least one uppercase letter",
    path: ["password"],
  })
  // Check if password contains one numerical character
  .refine((data) => /[0-9]/.test(data.password), {
    message: "Password must contain at least one numerical character",
    path: ["password"],
  });
