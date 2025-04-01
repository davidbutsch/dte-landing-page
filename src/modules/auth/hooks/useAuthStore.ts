import { User } from "@/modules/auth/types";
import { fetchUserAttributes, getCurrentUser } from "@aws-amplify/auth";
import { create } from "zustand";

type AuthStoreState = {
  user: User | null;
  isUserLoading: boolean;
  setUser: (user: User | null) => any;
};

export const useAuthStore = create<AuthStoreState>((set: any) => ({
  user: null,
  isUserLoading: true,
  setUser: (user: User | null) => set({ user, isUserLoading: false }),
}));

/**
 * Stores the current user in the authentication store.
 *
 * Attempts to retrieve the current user and stores the user in the store if user is authenticated.
 * Otherwise, the stored user is cleared.
 */
export const storeUser = async (): Promise<void> => {
  try {
    // Get user data, if not logged in an exception will be thrown
    const userAuthDetails = await getCurrentUser();
    const userAttributes = await fetchUserAttributes();

    const user = { ...userAuthDetails, attributes: userAttributes };
    useAuthStore.getState().setUser(user); // Store user if authenticated
  } catch (error) {
    useAuthStore.getState().setUser(null); // Clear stored user if not authenticated
  }
};
storeUser();
