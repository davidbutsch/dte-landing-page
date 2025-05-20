import { clearStateStrings, isShallowEqual } from "@/common";
import { openErrorDialog } from "@/components";
import { ProfileDetailsSchema, storeUser, useAuthStore } from "@/modules/auth";
import { updateUserAttributes } from "@aws-amplify/auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid2,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const EditProfileMenuItem = () => {
  const { user } = useAuthStore();
  if (!user) return;

  // API
  const updateUserAttributesMutation = useMutation({
    mutationFn: updateUserAttributes,

    onError: (error) => {
      switch (error.name) {
        // If unrecognized error display error dialog
        default:
          console.error(error);
          openErrorDialog({ title: error.name, text: error.message });
      }
    },
    // Updates client user state and closes dialog box.
    onSuccess: () => {
      storeUser(); // refetch and store user
      handleDialogClose();
    },
  });

  // Persists initial data across renders
  const initialInputs = {
    givenName: user?.attributes.given_name,
    familyName: user.attributes.family_name,
    phoneNumber: user.attributes.phone_number,
  };

  // STATE
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(clearStateStrings(initialInputs));

  // Disable save button if no changes have been made
  const isSaveDisabled = isShallowEqual(initialInputs, inputs);

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
   * Checks for valid inputs and sends update query.
   *
   * Triggered by the save button.
   */
  const handleSave = async () => {
    const isInputsValid = validateInputs();
    if (!isInputsValid) return;

    if (!inputs.phoneNumber?.startsWith("+"))
      inputs.phoneNumber = `+${inputs.phoneNumber}`;

    updateUserAttributesMutation.mutate({
      userAttributes: {
        given_name: inputs.givenName,
        family_name: inputs.familyName,
        phone_number: inputs.phoneNumber,
      },
    });
  };

  /**
   * Validates all inputs for the profile editor.
   *
   * @returns True if there are no validation errors, otherwise false.
   */
  const validateInputs = () => {
    // Reset the error state for all input fields
    setErrors(clearStateStrings(initialInputs));

    /*
      Each 'errors' property corrosponds to an input field.
      The value of each property is an array of error message strings.
      These messages are joined together as one string when updating the error state below.
    */
    const errors = ProfileDetailsSchema.safeParse({
      givenName: inputs.givenName,
      familyName: inputs.familyName,
      phoneNumber: inputs.phoneNumber,
    }).error?.flatten().fieldErrors;

    // Cast as any because I don't want to figure out these typing issues
    const unsafeErrors: any = errors;

    // Updates the error message for each input field TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    setErrors((current) => ({
      givenName: unsafeErrors?.givenName?.join(", ") || current.givenName,
      familyName: unsafeErrors?.familyName?.join(", ") || current.familyName,
      phoneNumber: unsafeErrors?.phoneNumber?.join(", ") || current.phoneNumber,
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
        Edit Profile
      </MenuItem>
      {/* Dialog popup */}
      <Dialog
        disableEnforceFocus
        fullWidth
        open={open}
        onClose={handleDialogClose}
        onKeyDown={(e) => {
          // Stop event from propogating to parent Menu component ("Select By Typing" conflict)
          e.stopPropagation();
          // Save form on "Enter" key press
          if (e.key === "Enter" && !isSaveDisabled) handleSave();
        }}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack gap={2}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <FormControl fullWidth>
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
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <FormControl fullWidth>
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
              </Grid2>
            </Grid2>

            <FormControl>
              <FormLabel htmlFor="familyName" required>
                Phone Number
              </FormLabel>
              <TextField
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                value={inputs.phoneNumber}
                onChange={onInputChange}
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                placeholder="(123) 456-7890"
                autoComplete="tel"
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
            loading={updateUserAttributesMutation.isPending}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
