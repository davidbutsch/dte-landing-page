import { Stack } from "@mui/material";
import { Coupon } from "./Coupon";
import { PaymentInterval } from "./PaymentInterval";
import { PaymentMethodsBox } from "./PaymentMethodsBox";

export const PaymentStep = () => {
  return (
    <Stack gap={2}>
      <PaymentInterval />
      <Coupon />
      <PaymentMethodsBox />
    </Stack>
  );
};
