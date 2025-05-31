import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";

export function normalizePhoneNumber(
  input: string,
  defaultCountry: CountryCode = "US"
) {
  const phoneNumber = parsePhoneNumberFromString(input, defaultCountry);
  // TODO integrate with zod validator
  if (!phoneNumber || !phoneNumber.isValid()) return null;

  return phoneNumber.number; // in E.164 format
}
