import { z } from "zod";

export const ConfirmationCodeSchema = z.object({
  code: z.string().length(6, { message: "Invalid confirmation code" }),
});
