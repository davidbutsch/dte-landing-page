import { theme } from "@/theme";
import { List, ListItem } from "@mui/material";

export type FieldErrorListOptions = {
  errors: string[];
};

// TODO Redo form errors as lists are not supported form helper texts
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
      {errors?.map((error) => (
        <ListItem key={error} disablePadding>
          {error}
        </ListItem>
      ))}
    </List>
  );
};
