import { formatAsCurrency } from "@/common";
import {
  formatSubscriptionRange,
  getCouponSavings,
  getPromotionWithCode,
  QueryCoupon,
  tiersToUnitAmount,
} from "@/modules/checkout";
import { getProduct, getProductPrices } from "@/modules/products";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import {
  JsonParam,
  StringParam,
  useQueryParam,
  withDefault,
} from "use-query-params";

const BorderlessTableCell = styled(TableCell)({
  borderBottom: "none",
});

export const OrderSummary = () => {
  // STATE
  const [productId] = useQueryParam("productId", StringParam);
  if (!productId) return;

  const [priceId, setPriceId] = useQueryParam("priceId", StringParam);

  const [players] = useQueryParam(
    "players",
    withDefault(JsonParam, [{ name: "", grade: "" }])
  );

  const [queryCoupon] = useQueryParam<QueryCoupon | undefined>(
    "coupon",
    JsonParam
  );

  // API

  // Get product
  const getProductQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });
  const product = getProductQuery.data?.data;

  // Get product prices
  const getProductPricesQuery = useQuery({
    queryKey: ["product", productId, "prices"],
    queryFn: () => getProductPrices(productId),
  });
  const prices = getProductPricesQuery.data?.data;
  const selectedPrice = prices?.find((price) => price.id == priceId);

  // Set default selectedPrice
  useEffect(() => {
    if (!priceId) setPriceId(prices?.[0].id);
  }, [prices]);

  // Get coupon
  const getPromotionWithCodeQuery = useQuery({
    queryFn: () => getPromotionWithCode(queryCoupon?.code!),
    queryKey: ["coupon", queryCoupon?.code],
    // Only run query if query coupon is defined
    enabled: !!queryCoupon,
  });
  const promotion = getPromotionWithCodeQuery.data?.data;

  const timeRange = useMemo(
    () => (selectedPrice ? formatSubscriptionRange(selectedPrice) : null),
    [selectedPrice]
  );

  const unitPrice = useMemo(
    () =>
      selectedPrice && selectedPrice.tiers
        ? tiersToUnitAmount(selectedPrice.tiers, players.length)
        : null,
    [selectedPrice, players.length]
  );

  const descriptionRows = [
    {
      description: timeRange,
    },
    {
      description: product?.name,
      qty: players.length,
      unitPrice: unitPrice ? formatAsCurrency(unitPrice / 100) : null,
      total: unitPrice
        ? formatAsCurrency((unitPrice * players.length) / 100)
        : null,
    },
  ];

  const subTotal = unitPrice ? (unitPrice * players.length) / 100 : null;
  const couponSavings = promotion
    ? getCouponSavings(subTotal || 0, promotion.coupon)
    : null;

  const total = subTotal ? subTotal + (couponSavings || 0) : null;

  return (
    <Stack gap={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography>Your Order</Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Stack direction="row" width="100%" gap={1} alignItems="center">
            {product ? (
              <Box
                component="img"
                src={product.images[0]}
                width={48}
                height={48}
              />
            ) : (
              <Skeleton variant="rectangular" width={48} height={48} />
            )}

            <Box>
              <Typography fontWeight="bold">
                {product ? product.name : <Skeleton width="100px" />}
              </Typography>
              <Typography variant="subtitle2">
                {product ? (
                  `Qty : ${players.length}`
                ) : (
                  <Skeleton width="80px" />
                )}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography>Payment Summary</Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {descriptionRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {row.description === null ? (
                        <Skeleton />
                      ) : (
                        row.description
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {row.qty === null ? <Skeleton /> : row.qty}
                    </TableCell>
                    <TableCell align="right">
                      {row.unitPrice === null ? <Skeleton /> : row.unitPrice}
                    </TableCell>
                    <TableCell align="right">
                      {row.total === null ? <Skeleton /> : row.total}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <BorderlessTableCell />
                  <BorderlessTableCell />
                  <BorderlessTableCell align="right">
                    Subtotal
                  </BorderlessTableCell>
                  <BorderlessTableCell align="right">
                    {subTotal === null ? (
                      <Skeleton />
                    ) : (
                      formatAsCurrency(subTotal)
                    )}
                  </BorderlessTableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell align="right">
                    {queryCoupon?.code || "Coupon"}
                  </TableCell>
                  <TableCell align="right">
                    {couponSavings === null
                      ? "-"
                      : formatAsCurrency(couponSavings)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <BorderlessTableCell />
                  <BorderlessTableCell />
                  <BorderlessTableCell align="right">Total</BorderlessTableCell>
                  <BorderlessTableCell align="right">
                    {total === null ? <Skeleton /> : formatAsCurrency(total)}
                  </BorderlessTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  );
};
