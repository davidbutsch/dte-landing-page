import { z } from "zod";

export const CheckoutSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must contain at least 2 characters" }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
});
