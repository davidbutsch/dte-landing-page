import { Hero } from "@/modules/home";
import { Button, Stack, TextField } from "@mui/material";
import { ObjectParam, useQueryParams } from "use-query-params";

export const HomePage = () => {
  const [query, setQuery] = useQueryParams({
    inputs: ObjectParam,
    errors: ObjectParam,
  });

  /**
   * Generic on change handler for all input elements.
   *
   * Extracts component name to update appropriate state.
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuery({
      inputs: {
        ...query.inputs,
        [name]: value,
      },
    });
  };

  return (
    <Stack pt={10} direction="column" gap={15}>
      <Hero />
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={query.inputs?.["name"] || ""}
        onChange={onChange}
        fullWidth
      />
      <TextField
        label="Bio"
        variant="outlined"
        name="bio"
        value={query.inputs?.["bio"] || ""}
        onChange={onChange}
        fullWidth
      />
      {/* <Button
        onClick={() => {
          setQuery({
            inputs: { bio: query.inputs.bio },
          });
        }}
      >
        Delete 'name'
      </Button> */}
    </Stack>
  );
};
