/**
 * Extracts the keys of an object with exact key typing (so typescript doesn't scream during object iteration)
 */
export const keys = <T extends object>(object: T) =>
  Object.keys(object) as Array<keyof T>;
