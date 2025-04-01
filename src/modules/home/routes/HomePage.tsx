import { useAuthStore } from "@/modules/auth";
import { Stack, Typography } from "@mui/material";

export const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <Stack pt={10} direction="column" gap={15}>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
      <Typography>{user?.attributes.given_name}</Typography>
    </Stack>
  );
};
