import { Subscription } from "@/modules/checkout";
import { getProduct } from "@/modules/products";
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type SubscriptionStatusMessageProps = {
  status: Subscription["status"];
};

const SubscriptionStatusMessage = (props: SubscriptionStatusMessageProps) => {
  const { status } = props;

  switch (status) {
    case "active":
      return (
        <Typography color="success.main">
          Your subscription is active.
        </Typography>
      );

    case "past_due":
      return (
        <Typography color="warning.main">
          Your payment is past due. Please update your payment method.
        </Typography>
      );

    case "incomplete":
      return (
        <Typography color="error.main">
          Your subscription is inactive as our initial payment attempt was
          unsuccessful. Please contact our support team to resolve this issue.
        </Typography>
      );

    case "incomplete_expired":
      return (
        <Typography color="error.main">
          The payment attempt failed and your subscription has expired. Please
          contact our support team to resolve this issue.
        </Typography>
      );

    case "unpaid":
      return (
        <Typography color="error.main">
          Your subscription is unpaid. Update your payment info to restore
          access.
        </Typography>
      );

    case "canceled":
      return (
        <Typography color="text.secondary">
          Your subscription was canceled. Renew to regain access.
        </Typography>
      );

    case "paused":
      return (
        <Typography color="warning.main">
          Your subscription is paused. Resume it to continue using the service.
        </Typography>
      );

    default:
      return (
        <Typography color="text.secondary">
          Subscription status unknown.
        </Typography>
      );
  }
};

export type SubscriptionsListItemProps = {
  subscription: Subscription;
};

export const SubscriptionsListItem = (props: SubscriptionsListItemProps) => {
  const { subscription } = props;
  const price = subscription.items[0].price;
  if (typeof price == "string") return;

  const productId = price.productId;

  if (!productId) return;

  const getProductQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId!),
  });
  const product = getProductQuery.data?.data;

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            onClick={toggleExpanded}
            sx={{
              cursor: "pointer",
              width: 27,
              height: 27,
              color: "#000",
            }}
            className="material-symbols-outlined"
          >
            {expanded ? "arrow_drop_up" : "arrow_drop_down"}
          </IconButton>
        }
      >
        <ListItemIcon>
          <Box
            component="img"
            src={product?.images[0]}
            width={40}
            height={40}
          />
        </ListItemIcon>

        <ListItemText
          primary={<Typography fontWeight={600}>{product?.name} </Typography>}
          secondary={
            <Chip
              color={subscription.status == "active" ? "success" : "default"}
              size="small"
              label={subscription.status == "active" ? "Active" : "Inactive"}
            />
          }
        />
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List sx={{ pb: 2, pl: 2 }}>
          <SubscriptionStatusMessage status={subscription.status} />
          <Typography
            sx={{
              textDecoration:
                subscription.status !== "active" ? "line-through" : "none",
            }}
          >
            Billing every {price.recurring?.intervalCount}{" "}
            {price.recurring?.interval}
            {price.recurring?.intervalCount !== 1 && "s"}
          </Typography>
        </List>
      </Collapse>
    </>
  );
};
