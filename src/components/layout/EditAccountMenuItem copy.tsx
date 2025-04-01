import { keys } from "@/common";
import { storeUser, useAuthStore } from "@/modules/auth";
import { updateUserAttributes } from "@aws-amplify/auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { z } from "zod";

const AccountDetailsSchema = z.object({
  givenName: z
    .string({ message: "Invalid first name" })
    .min(2, { message: "First name must contain at least 2 characters" }),
  familyName: z
    .string({ message: "Invalid last name" })
    .min(1, { message: "Last name must contain at least 1 character" }),
});

function clearStrings<T extends Record<string, string | undefined>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).map(([key]) => [key, ""])) as T;
}

function areInputsEqual(inputs1: Inputs, inputs2: Inputs) {
  const inputKeys = keys(inputs1);

  // Check if every key pair from both input objects are equal
  const allInputsEqual = inputKeys.every((key) => inputs1[key] == inputs2[key]);

  return allInputsEqual;
}

type Inputs = {
  givenName: string | undefined;
  familyName: string | undefined;
};

export const EditAccountMenuItem = () => {
  const { user } = useAuthStore();
  if (!user) return;

  // Persists initial data across renders
  const initialInputs = useRef({
    givenName: user?.attributes.given_name,
    familyName: user.attributes.family_name,
  }).current;

  // STATE
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(clearStrings(initialInputs));

  // Disable save button if no changes have been made
  const isSaveDisabled = areInputsEqual(initialInputs, inputs);

  // METHODS
  const handleDialogClose = () => setOpen(false);
  const handleDialogOpen = () => setOpen(true);

  /**
   * Generic on change handler for all input elements.
   *
   * Extracts component name to update appropriate state.
   */
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  /**
   * Checks for valid inputs, sends update query, updates client user state, and closes dialog box.
   *
   * Triggered by the save button.
   */
  const handleSave = async () => {
    const isInputsValid = validateInputs();
    if (!isInputsValid) return;

    try {
      await updateUserAttributes({
        userAttributes: {
          given_name: inputs.givenName,
          family_name: inputs.familyName,
        },
      });

      storeUser(); // refetch and store user
    } catch (error) {
      console.error(error);
    }

    // updateProfile(user, { displayName: inputs.displayName });
    // setUser({ ...user, displayName: inputs.displayName });
    handleDialogClose();
  };

  /**
   * Validates all inputs for the account editor.
   *
   * @returns True if there are no validation errors, otherwise false.
   */
  const validateInputs = () => {
    // Reset the error state for all input fields
    setErrors(clearStrings(initialInputs));

    /*
      Each 'errors' property corrosponds to an input field.
      The value of each property is an array of error message strings.
      These messages are joined together as one string when updating the error state below.
    */
    const errors = AccountDetailsSchema.safeParse({
      givenName: inputs.givenName,
      familyName: inputs.familyName,
    }).error?.flatten().fieldErrors;

    // Cast as any because I don't want to figure out these typing issues
    const unsafeErrors: any = errors;

    // Updates the error message for each input field TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    setErrors((current) => ({
      givenName: unsafeErrors?.givenName?.join(", ") || current.givenName,
      familyName: unsafeErrors?.familyName?.join(", ") || current.familyName,
    }));

    // Return true if no errors
    return !errors;
  };

  return (
    <>
      {/* Menu item button */}
      <MenuItem onClick={handleDialogOpen}>
        <ListItemIcon
          className="material-symbols-outlined"
          color="red !important"
        >
          person_edit
        </ListItemIcon>
        Edit Account
      </MenuItem>
      {/* Dialog popup */}
      <Dialog
        fullWidth
        open={open}
        onClose={handleDialogClose}
        onKeyUp={(e) => {
          if (e.key === "Enter" && !isSaveDisabled) handleSave();
        }}
      >
        <DialogTitle>Edit Account Details</DialogTitle>
        <DialogContent dividers>
          <Stack gap={2}>
            <FormControl>
              <FormLabel htmlFor="givenName" required>
                First Name
              </FormLabel>
              <TextField
                error={!!errors.givenName}
                helperText={errors.givenName}
                value={inputs.givenName}
                onChange={onInputChange}
                id="givenName"
                type="text"
                name="givenName"
                placeholder="John"
                autoComplete="given-name"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="familyName" required>
                Last Name
              </FormLabel>
              <TextField
                error={!!errors.familyName}
                helperText={errors.familyName}
                value={inputs.familyName}
                onChange={onInputChange}
                id="familyName"
                type="text"
                name="familyName"
                placeholder="Doe"
                autoComplete="family-name"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="cream" variant="contained" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
