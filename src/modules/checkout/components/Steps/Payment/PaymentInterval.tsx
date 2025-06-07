import { getProductPrices } from "@/modules/products";
import {
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { StringParam, useQueryParam } from "use-query-params";

export const PaymentInterval = () => {
  // STATE

  const [productId] = useQueryParam("productId", StringParam);
  if (!productId) return;

  const [priceId, setPriceId] = useQueryParam("priceId", StringParam);

  // API

  // Get product prices
  const { data: response, isLoading } = useQuery({
    queryKey: ["product", productId, "prices"],
    queryFn: () => getProductPrices(productId),
  });
  const prices = response?.data;

  useEffect(() => {
    if (prices && !priceId) setPriceId(prices?.[0].id);
  }, [prices]);

  // METHODS

  const handleRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setPriceId(value);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
      }}
    >
      <Collapse in={isLoading}>
        <LinearProgress />
      </Collapse>
      <CardContent>
        <Typography>Payment Frequency</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <Collapse in={Boolean(prices)}>
          <RadioGroup value={priceId || ""} onChange={handleRadioGroupChange}>
            {prices?.map((price) => (
              <Stack key={price.id} direction="row" gap={2} alignItems="center">
                <FormControlLabel
                  value={price.id}
                  control={<Radio />}
                  label={price.metadata?.title}
                />
                {price.metadata?.chip && (
                  <Chip label={price.metadata?.chip} size="small" />
                )}
              </Stack>
            ))}
          </RadioGroup>
        </Collapse>
      </CardContent>
    </Card>
  );
};
