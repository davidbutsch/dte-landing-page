import { z } from "zod";

export const PlayerFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must contain at least 2 characters" }),
});
