import { Promotion } from "@/modules/checkout";

export function promotionCodeToText(promotion: Promotion) {
  const { coupon } = promotion;

  if (!coupon.valid) return `${coupon.name} is not available.`;

  let text = "";

  if (coupon.percentOff) text += `${coupon.percentOff}% off`;
  else if (coupon.amountOff) text += `$${coupon.amountOff / 100} off`;

  if (coupon.duration == "forever") text += ` forever`;
  else if (coupon.duration == "repeating")
    if (coupon.durationInMonths == 1) text += " for 1 month";
    else text += ` for ${coupon.durationInMonths} months`;

  return text;
}
