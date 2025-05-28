import { PriceTier } from "@/modules/products";

export function tiersToUnitAmount(tiers: PriceTier[], quantity: number) {
  // Validate inputs
  if (!Array.isArray(tiers) || tiers.length === 0) {
    console.error("Tiers array is invalid or empty.");
    return; // Or throw an error, or return 0, depending on desired handling
  }
  if (typeof quantity !== "number" || quantity < 0) {
    console.error("Quantity must be a non-negative number.");
    return; // Or handle as appropriate
  }

  // Sort tiers to ensure correct evaluation.
  // Tiers with null 'upTo' (infinity) should be considered last.
  // Otherwise, sort by 'upTo' in ascending order.
  const sortedTiers = [...tiers].sort((a, b) => {
    if (a.upTo === null && b.upTo === null) {
      return 0; // Keep original order if both are null (should ideally be only one such tier)
    }
    if (a.upTo === null) {
      return 1; // a (null) comes after b (numeric)
    }
    if (b.upTo === null) {
      return -1; // b (null) comes after a (numeric)
    }
    return a.upTo - b.upTo; // Sort by numeric upTo
  });

  // Find the applicable tier
  for (const tier of sortedTiers) {
    if (tier.upTo === null) {
      // This is the "infinity" tier, applies if no previous tier matched.
      // Assumes quantity is greater than previous tiers' upTo limits.
      return tier.unitAmount;
    }
    if (quantity <= tier.upTo) {
      return tier.unitAmount;
    }
  }

  // This part should ideally not be reached if tiers are well-defined
  // (e.g., last tier has upTo: null).
  // If quantity is larger than all defined 'upTo' values and no 'null' tier exists.
  console.warn(
    "No applicable tier found for the given quantity. Check tier definitions."
  );
  return;
}
