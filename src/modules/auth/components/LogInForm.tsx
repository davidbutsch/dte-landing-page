import {
  Box,
  Button,
  FormControl,
  FormLabel,
  styled,
  TextField,
} from "@mui/material";

import { INCORRECT_CREDENTIALS_ERROR } from "@/common";
import { storeUser } from "@/modules/auth/hooks";
import { CredentialsSchema } from "@/modules/auth/schemas";
import { signIn } from "@aws-amplify/auth";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

import { openErrorDialog } from "@/components";

const Form = styled(Box)<React.ComponentProps<"form">>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(2),
}));

export const LogInForm = () => {
  // STATE
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(inputs);

  // API
  const signInUserMutation = useMutation({
    mutationFn: signIn,

    onError: (error) => {
      switch (error.name) {
        // If incorrect credentials set form error
        case INCORRECT_CREDENTIALS_ERROR:
          setErrors({
            email: "Invalid credentials",
            password: "Invalid credentials",
          });
          break;

        // If unrecognized error display error dialog
        default:
          console.error(error);
          openErrorDialog({ text: error.message });
      }
    },
    onSuccess: async () => {
      // After user is signed in, set user state
      storeUser();

      // Then navigate to root with page reload
      window.location.href = "/";
    },
  });

  // METHODS

  /**
   * Handles the form submission event.
   *
   * @param event The form submission event.
   *
   * Triggered by the submit button or by pressing enter inside an input field.
   */
  const onSubmit = async (event: React.FormEvent) => {
    // Prevent the page from reloading on submit
    event.preventDefault();

    // If the form contains invalid inputs, do not submit
    const isInputsValid = validateInputs();
    if (!isInputsValid) return;

    // if form contains no invalid inputs, log in user
    signInUserMutation.mutate({
      username: inputs.email,
      password: inputs.password,
    });
  };

  /**
   * Validates all inputs for the log in form.
   *
   * @returns True if there are no validation errors, otherwise false.
   */
  const validateInputs = () => {
    // Reset the error state for all input fields
    setErrors({
      email: "",
      password: "",
    });

    /*
        Each 'errors' property corrosponds to an input field.
        The value of each property is an array of error message strings.
        These messages are joined together as one string when updating the error state below.
      */
    const errors = CredentialsSchema.safeParse({
      email: inputs.email,
      password: inputs.password,
    }).error?.flatten().fieldErrors;

    // Cast as any because I don't want to figure out these typing issues
    const unsafeErrors: any = errors;

    // Updates the error message for each input field
    setErrors((current) => ({
      email: unsafeErrors?.email?.join(", ") || current.email,
      password: unsafeErrors?.password?.join(", ") || current.password,
    }));

    // Return true if no errors
    return !errors;
  };

  /**
   * Generic on change handler for all input elements.
   *
   * Extracts component name to update appropriate state.
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      <Form as="form" onSubmit={onSubmit} noValidate>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={!!errors.email}
            helperText={errors.email}
            value={inputs.email}
            onChange={onChange}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            error={!!errors.password}
            helperText={errors.password}
            value={inputs.password}
            onChange={onChange}
            id="password"
            type="password"
            name="password"
            placeholder="••••••"
            autoComplete="password"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          onClick={validateInputs}
          loading={signInUserMutation.isPending}
        >
          Continue
        </Button>
      </Form>
    </>
  );
};
