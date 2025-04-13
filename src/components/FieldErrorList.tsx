import { theme } from "@/theme";
import { List, ListItem } from "@mui/material";

export type FieldErrorListOptions = {
  errors: string[];
};

export const FieldErrorList = ({ errors }: FieldErrorListOptions) => {
  return (
    <List
      dense
      sx={{
        listStyleType: "disc",
        pl: 1,
        "& .MuiListItem-root": {
          color: theme.palette.error.main,
          display: "list-item",
        },
      }}
    >
      {errors.map((error) => (
        <ListItem disablePadding>{error}</ListItem>
      ))}
    </List>
  );
};
