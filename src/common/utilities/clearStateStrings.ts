/**
 * Clears all string values in the given object by replacing them with empty strings.
 *
 * @template T - A generic type extending a record where keys are strings and values are strings or undefined.
 * @param obj - The object whose string values will be cleared.
 * @returns A new object with the same keys as the input object, but all string values replaced with empty strings.
 */
export const clearStateStrings = <T extends Record<string, string | undefined>>(
  obj: T
): T => Object.fromEntries(Object.entries(obj).map(([key]) => [key, ""])) as T;
