import { Icon, List, ListItem, ListItemText } from "@mui/material";

export type ProductCardFeaturesOptions = {
  features: string[];
};

export const ProductCardFeatures = ({
  features,
}: ProductCardFeaturesOptions) => {
  return (
    <List dense>
      {features.map((feature) => (
        <ListItem disableGutters key={feature}>
          <Icon
            sx={{
              mr: 2,
            }}
            color="success"
            className="material-symbols-outlined"
          >
            check
          </Icon>
          <ListItemText primary={feature} />
        </ListItem>
      ))}
    </List>
  );
};
