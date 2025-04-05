import { env } from "@/common";
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(env.STRIPE_PUBLISHABLE_KEY);
