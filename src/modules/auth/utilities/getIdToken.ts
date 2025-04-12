import { fetchAuthSession } from "@aws-amplify/auth";

/**
 * Retrieves the ID token from the current authentication session.
 *
 * @returns A promise that resolves to the ID token as a string, or undefined if not available.
 */
export const getIdToken = async () => {
  try {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();

    return idToken;
  } catch (error) {
    console.warn(`Failed to get ID token. User is probably signed out.`);
  }
};
