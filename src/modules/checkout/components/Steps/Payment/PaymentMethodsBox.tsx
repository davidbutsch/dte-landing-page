import { AddPaymentMethod, PaymentMethods } from "@/modules/stripe";
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

export const PaymentMethodsBox = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
      }}
    >
      <CardContent>
        <Typography>Payment Methods</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <Stack gap={1}>
          <PaymentMethods />
          <AddPaymentMethod />
        </Stack>
      </CardContent>
    </Card>
  );
};
