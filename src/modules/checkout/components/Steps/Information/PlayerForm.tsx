import { QueryPlayer } from "@/modules/checkout";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEventHandler, FocusEventHandler, useState } from "react";
import { JsonParam, useQueryParam, withDefault } from "use-query-params";

export type PlayerFormProps = {
  index: number;
};

export const PlayerForm = (props: PlayerFormProps) => {
  const { index } = props;

  // STATE
  const [errors] = useQueryParam<QueryPlayer[]>(
    "errors",
    withDefault(JsonParam, [])
  );

  const [players, setPlayers] = useQueryParam<QueryPlayer[]>(
    "players",
    withDefault(JsonParam, [{ name: "", grade: "" }])
  );

  const [inputs, setInputs] = useState(players);

  // METHODS

  // Update query inputs based on input name.
  const handleTextFieldBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    setPlayers(
      players.map((player, i) =>
        i == index ? { ...player, [name]: value } : player
      )
    );
  };

  // Update state inputs based on input element name.
  const handleTextFieldChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;

    setInputs((previous) =>
      previous.map((player, i) =>
        i == index ? { ...player, [name]: value } : player
      )
    );
  };

  // Update query inputs based on input name.
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setPlayers(
      players.map((player, i) =>
        i == index ? { ...player, [name]: value } : player
      )
    );
  };

  // Remove last player
  const handleDeletePlayer = () => setPlayers(players.slice(0, -1));

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>Player {index + 1}</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <Stack gap={2}>
          <FormControl>
            <FormLabel htmlFor="email" required>
              Player Name
            </FormLabel>
            <TextField
              type="text"
              name="name"
              value={inputs[index]?.name || ""}
              onChange={handleTextFieldChange}
              onBlur={handleTextFieldBlur}
              error={!!errors[index]?.name}
              helperText={errors[index]?.name}
              size="small"
              placeholder="John Doe"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <InputLabel size="small">Grade</InputLabel>
            <Select
              name="grade"
              value={players[index]?.grade || ""}
              onChange={handleSelectChange}
              size="small"
              label="Grade"
              defaultValue=""
              error={!!errors[index]?.grade}
            >
              <MenuItem value="Kindergarten">Kindergarten</MenuItem>
              <MenuItem value="1st">1st</MenuItem>
              <MenuItem value="2nd">2nd</MenuItem>
              <MenuItem value="3rd">3rd</MenuItem>
              <MenuItem value="4th">4th</MenuItem>
              <MenuItem value="5th">5th</MenuItem>
              <MenuItem value="6th">6th</MenuItem>
              <MenuItem value="7th">7th</MenuItem>
              <MenuItem value="8th">8th</MenuItem>
              <MenuItem value="9th">9th</MenuItem>
              <MenuItem value="10th">10th</MenuItem>
            </Select>
            <FormHelperText color="error">
              {errors[index]?.grade}
            </FormHelperText>
          </FormControl>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          // Disable button if this player form is not last or if there is only one open player form
          disabled={players.length == 1}
          size="small"
          variant="contained"
          startIcon={<Icon className="material-symbols-outlined">delete</Icon>}
          sx={{
            ml: "auto",
          }}
          onClick={handleDeletePlayer}
        >
          Delete Player
        </Button>
      </CardActions>
    </Card>
  );
};
