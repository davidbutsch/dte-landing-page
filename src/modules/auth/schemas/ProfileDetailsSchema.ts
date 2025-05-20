import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const ProfileDetailsSchema = z.object({
  givenName: z
    .string({ message: "Invalid first name" })
    .min(2, { message: "First name must contain at least 2 characters" }),
  familyName: z
    .string({ message: "Invalid last name" })
    .min(1, { message: "Last name must contain at least 1 character" }),
  phoneNumber: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number" }),
});
