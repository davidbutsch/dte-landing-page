import {
  CardCheck,
  CardIcon,
  PaymentMethod,
  getPaymentMethods,
} from "@/modules/stripe";
import {
  Button,
  Collapse,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export type CardCheckLogo = {
  condition: CardCheck | null;
};

const CardCheckLogo = ({ condition }: CardCheckLogo) => {
  switch (condition) {
    case "pass":
      return (
        <Stack alignItems="center" direction="row" gap={1}>
          <Typography variant="subtitle2">Passed</Typography>
          <Icon
            className="material-symbols-outlined"
            color="success"
            fontSize="small"
          >
            check_circle
          </Icon>
        </Stack>
      );
    case "fail":
      return (
        <Stack alignItems="center" direction="row" gap={1}>
          <Typography variant="subtitle2">Failed</Typography>
          <Icon
            className="material-symbols-outlined"
            color="success"
            fontSize="small"
          >
            cancel
          </Icon>
        </Stack>
      );
    case "unavailable":
      return (
        <Stack alignItems="center" direction="row" gap={1}>
          <Typography variant="subtitle2">Unavailable</Typography>
          <Icon
            className="material-symbols-outlined"
            color="warning"
            fontSize="small"
          >
            warning
          </Icon>
        </Stack>
      );
    case "unchecked":
    default:
      return (
        <Stack alignItems="center" direction="row" gap={1}>
          <Typography variant="subtitle2">Unchecked</Typography>
          <Icon
            className="material-symbols-outlined"
            color="inherit"
            fontSize="small"
          >
            block
          </Icon>
        </Stack>
      );
  }
};

type CardMethodSubListItemOptions = {
  label: string;
  value: string | React.ReactNode;
};

const CardMethodSubListItem = ({
  label,
  value,
}: CardMethodSubListItemOptions) => {
  return (
    <ListItem disablePadding sx={{ pl: 4, maxWidth: "fit-content" }}>
      <ListItemText
        primary={<Typography variant="subtitle2">{label}</Typography>}
        sx={{
          minWidth: { xs: "fit-content", sm: 200, md: 250 },
        }}
      />
      {value}
    </ListItem>
  );
};

type CardMethodOptions = {
  method: PaymentMethod;
};

const CardMethod = ({ method }: CardMethodOptions) => {
  const [open, setOpen] = useState(false);

  const onClick = () => setOpen((prev) => !prev);

  console.log(method);

  return (
    <>
      <ListItem
        secondaryAction={
          <Stack direction="row" spacing={2}>
            <Button
              size="small"
              variant="contained"
              color="cream"
              sx={{
                cursor: "pointer",
                color: "#000",
              }}
              className="material-symbols-outlined"
            >
              Set Default
            </Button>
            <IconButton
              onClick={onClick}
              sx={{
                cursor: "pointer",
                width: 27,
                color: "#000",
              }}
              className="material-symbols-outlined"
            >
              {open ? "arrow_drop_up" : "arrow_drop_down"}
            </IconButton>
          </Stack>
        }
      >
        <ListItemIcon>
          <CardIcon brand={method.card.brand} width={40} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography fontWeight={600}>•••• {method.card.last4}</Typography>
          }
          secondary={
            <Typography variant="subtitle2">
              Expires {method.card.expires}
            </Typography>
          }
        />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pb: 2 }}>
          <CardMethodSubListItem
            label="Billing address"
            value={`${method.billing.postalCode}, ${method.billing.country}`}
          />
          <CardMethodSubListItem
            label="Number"
            value={`•••• ${method.card.last4}`}
          />
          <CardMethodSubListItem label="Expires" value={method.card.expires} />
          <CardMethodSubListItem
            label="Funding"
            value={
              method.card.funding.charAt(0).toUpperCase() +
              method.card.funding.slice(1)
            }
          />
          <CardMethodSubListItem
            label="CVC check"
            value={<CardCheckLogo condition={method.card.checks.cvc} />}
          />
          <CardMethodSubListItem
            label="Zip check"
            value={
              <CardCheckLogo condition={method.card.checks.addressPostalCode} />
            }
          />
          <CardMethodSubListItem
            label="Address line check"
            value={<CardCheckLogo condition={method.card.checks.addressLine} />}
          />
        </List>
      </Collapse>
    </>
  );
};

export const PaymentMethods = () => {
  const { data: response } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: () => getPaymentMethods(),
  });

  return (
    <List dense disablePadding>
      {response?.data.map((method, index) => {
        return (
          <>
            <CardMethod key={method.id} method={method} />
            {index < response.data.length - 1 && ( // only display divider if not last item
              <Divider variant="inset" />
            )}
          </>
        );
      })}
    </List>
  );
};
// <ListItemButton onClick={handleClick}>
//   <ListItemIcon>
//     <InboxIcon />
//   </ListItemIcon>
//   <ListItemText primary="Inbox" />
//   {open ? <ExpandLess /> : <ExpandMore />}
// </ListItemButton>
// <Collapse in={open} timeout="auto" unmountOnExit>
//   <List component="div" disablePadding>
//     <ListItemButton sx={{ pl: 4 }}>
//       <ListItemIcon>
//         <StarBorder />
//       </ListItemIcon>
//       <ListItemText primary="Starred" />
//     </ListItemButton>
//   </List>
// </Collapse>
