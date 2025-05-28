import { SUPPORT_EMAIL_ADDRESS } from "@/common";
import { openInfoDialog } from "@/components";
import {
  getPromotionWithCode,
  promotionCodeToText,
  QueryCoupon,
} from "@/modules/checkout";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Icon,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { JsonParam, useQueryParam } from "use-query-params";

export const Coupon = () => {
  const [queryCoupon, setQueryCoupon] = useQueryParam<QueryCoupon | undefined>(
    "coupon",
    JsonParam
  );

  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Update coupon code state
  const handleCouponInputChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;
    setCouponCode(value);
  };

  const handleApplyCoupon: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { data: promotion } = await getPromotionWithCode(couponCode);

      setError(""); // Clear error
      setCouponCode(""); // Clear coupon code text field

      // Check if coupon is valid
      if (!promotion.coupon.valid)
        return setError("Coupon is not available right now.");

      // Check if a coupon is already applied
      if (queryCoupon)
        return setError("Only one coupon can be applied at a time.");

      // Push applied promotion to query params
      setQueryCoupon({
        id: promotion.id,
        code: promotion.code,
        discount: promotionCodeToText(promotion),
      });
    } catch (error) {
      if (error instanceof AxiosError)
        setError(
          error.response?.data.error.message || "Error getting coupon details."
        );
      else setError("Error getting coupon details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCoupon = () => setQueryCoupon(undefined);

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
      }}
    >
      <CardContent>
        <Typography>Coupon</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <Stack gap={2}>
          {queryCoupon && (
            <Chip
              key={queryCoupon.id}
              label={`${queryCoupon.code} — ${queryCoupon.discount}`}
              onDelete={handleDeleteCoupon}
              size="small"
              sx={{
                width: "fit-content",
              }}
            />
          )}
          <form onSubmit={handleApplyCoupon}>
            <Stack direction="row" spacing={2}>
              <TextField
                type="text"
                name="code"
                value={couponCode}
                onChange={handleCouponInputChange}
                error={Boolean(error)}
                helperText={error}
                size="small"
                fullWidth
                variant="outlined"
                placeholder="CODE123"
                autoComplete="off"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={couponCode.length == 0}
                loading={isLoading}
                sx={{
                  height: 38,
                }}
              >
                Apply Coupon
              </Button>
            </Stack>
          </form>
          <Stack direction="row" alignItems="center" gap={1} component="span">
            <Icon className="material-symbols-outlined" fontSize="small">
              info
            </Icon>
            <Typography
              variant="caption"
              sx={{
                mt: 1 / 4,

                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() =>
                openInfoDialog({
                  title: "Coupons",
                  lines: [
                    "Coupon discounts apply to all invoices generated while the coupon is active. For instance, a 50% off monthly coupon applied to a yearly subscription will discount the entire year's fee.",
                    "Promotion codes associated with a coupon may be restricted and only eligible for specified products, specified customers, or during some specified dates.",
                    "When completing purchases online, only one coupon may be applied at a time.",
                    `For more information or assistance, please contact us at ${SUPPORT_EMAIL_ADDRESS}`,
                  ],
                })
              }
            >
              Read more on coupons
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
