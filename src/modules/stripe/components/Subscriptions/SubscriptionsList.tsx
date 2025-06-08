import { LoadingWrapper } from "@/components";
import { getCustomerSubscriptions } from "@/modules/stripe";
import { theme } from "@/theme";
import { Divider, List, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SubscriptionsListItem } from "./SubscriptionsListItem";

export const SubscriptionsList = () => {
  const isMediumScreenSize = useMediaQuery(theme.breakpoints.down("md"));

  const getCustomerSubscriptionsQuery = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getCustomerSubscriptions,
  });
  const subscriptions = getCustomerSubscriptionsQuery.data?.data || [];

  return (
    <List
      dense={!isMediumScreenSize}
      disablePadding
      sx={{ position: "relative" }}
    >
      <LoadingWrapper isLoading={getCustomerSubscriptionsQuery.isLoading}>
        {subscriptions.map((subscription, index) => {
          return (
            <React.Fragment key={subscription.id}>
              <SubscriptionsListItem subscription={subscription} />
              {index < subscriptions.length - 1 && ( // only display divider if not last item
                <Divider variant="inset" />
              )}
            </React.Fragment>
          );
        })}
      </LoadingWrapper>
    </List>
  );
};
