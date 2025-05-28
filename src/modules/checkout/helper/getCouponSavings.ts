import { Coupon } from "@/modules/checkout";

export function getCouponSavings(subTotal: number, coupon: Coupon) {
  if (coupon.amountOff) return -coupon.amountOff;
  else if (coupon.percentOff) return -subTotal * (coupon.percentOff / 100);
  else return null;
}
