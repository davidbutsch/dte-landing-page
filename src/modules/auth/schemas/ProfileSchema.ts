import { z } from "zod";

export const ProfileSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z
    .string({ message: "Invalid first name" })
    .min(2, { message: "First name must contain at least 2 characters" }),
  lastName: z
    .string({ message: "Invalid last name" })
    .min(1, { message: "Last name must contain at least 1 character" }),
});
