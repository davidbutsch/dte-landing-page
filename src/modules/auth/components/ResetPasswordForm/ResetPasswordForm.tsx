import { INVALID_VERIFICATION_CODE_ERROR } from "@/common";
import { FieldErrorList, openErrorDialog } from "@/components";
import {
  ConfirmationCodeSchema,
  PasswordsSchema,
} from "@/modules/auth/schemas";
import { confirmResetPassword, resetPassword } from "@aws-amplify/auth";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { z } from "zod";

const Form = styled(Box)<React.ComponentProps<"form">>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(2),
}));

const StepButton = styled(Button)(() => ({
  flex: "1 1 0",
  width: 0,
}));

const fields = ["email", "code", "password", "repeatPassword"];

const initialInputsState = Object.fromEntries(
  fields.map((field) => [field, ""])
) as Record<(typeof fields)[number], string>;

const initialErrorsState = Object.fromEntries(
  fields.map((field) => [field, []])
) as Record<(typeof fields)[number], string[]>;

/**
 * Multistep form that handles the reset password process.
 */
export const ResetPasswordForm = () => {
  // STATE
  const [activeStep, setActiveStep] = useState(0);
  const [inputs, setInputs] = useState(initialInputsState);
  const [errors, setErrors] = useState(initialErrorsState);

  // API
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      console.log(error);
      switch (error.name) {
        // If unrecognized error, display error dialog
        default:
          console.error(error);
          openErrorDialog({ text: error.message });
      }
    },
    onSuccess: () => {
      // After user is signed up, move on to next step
      setActiveStep((prevStep) => prevStep + 1);
    },
  });
  const confirmResetPasswordMutation = useMutation({
    mutationFn: confirmResetPassword,
    onError: (error) => {
      switch (error.name) {
        case INVALID_VERIFICATION_CODE_ERROR:
          setErrors((current) => ({
            ...current,
            code: ["Invalid confirmation code"],
          }));
          break;
        // If unrecognized error, display error dialog
        default:
          console.error(error);
          openErrorDialog({ text: error.message });
      }
    },
    onSuccess: async () => {
      // After reset password is confirmed, navigate to log in with page reload
      window.location.href = "/sign-up";
    },
  });

  // METHODS

  /**
   * Handles the form submission event.
   *
   * @param event The form submission event.
   *
   * Triggered by the next button, submit button, or by pressing enter inside an input field.
   */
  const onSubmit = (event: React.FormEvent) => {
    // Prevent the page from reloading on submit
    event.preventDefault();

    // If the step contains invalid inputs, do not continue
    const isStepInputsValid = validateStepInputs(activeStep);
    if (!isStepInputsValid) return;

    switch (activeStep) {
      // At this step a confirmation email should be sent
      case 0:
        // Sends email and moves to next step on success
        resetPasswordMutation.mutate({
          username: inputs.email,
        });

        break;
      // At this step a confirmation code has been entered. We validate this code when submitting the new password in step 2
      case 1:
        // Move on to next step
        setActiveStep((prevStep) => prevStep + 1);
        break;
      // At this step we submit the new password
      case 2:
        // Confirm sign up with emailed confirmation code
        confirmResetPasswordMutation.mutate({
          username: inputs.email,
          confirmationCode: inputs.code,
          newPassword: inputs.password,
        });
    }
  };

  /**
   * Validates the inputs for a specific step.
   *
   * @param step The current step of the sign-up process (0 for email, 1 for confirmation code, 2 for new password).
   * @returns True if there are no validation errors, otherwise false.
   */
  const validateStepInputs = (step: number): boolean => {
    // Reset the error state for all input fields
    setErrors(initialErrorsState);

    // Select appropriate data/schema required to validate current step
    const stepData = [
      {
        email: inputs.email,
      },
      { code: inputs.code },
      { password: inputs.password, repeatPassword: inputs.repeatPassword },
    ][step];
    const stepSchema = [
      z.object({ email: z.string() }),
      ConfirmationCodeSchema,
      PasswordsSchema,
    ][step];

    /*
      Each 'errors' property corrosponds to an input field.
      The value of each property is an array of error message strings.
      These messages are joined together as one string when updating the error state below.
    */
    const errors = stepSchema?.safeParse(stepData).error?.flatten().fieldErrors;

    // Cast as any because I don't want to figure out these typing issues
    const unsafeErrors = errors as any;

    // Updates the error message for each input field
    setErrors((current) => ({
      email: unsafeErrors?.email || current.email,
      code: unsafeErrors?.code || current.code,
      password: unsafeErrors?.password || current.password,
      repeatPassword: unsafeErrors?.repeatPassword || current.password,
    }));

    // Return true if no errors
    return !errors;
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  /**
   * Generic on change handler for all input elements.
   *
   * Extracts component name to update appropriate state.
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      <Stack gap={1}>
        <Typography variant="h4" fontWeight={600}>
          Forgot password?
        </Typography>
        <Typography>
          {activeStep == 0 &&
            "Enter the email address linked to your account and we'll send a code to reset your password"}
          {activeStep == 1 &&
            "If this email is registered, you will receive a password reset confirmation code."}
          {activeStep == 2 &&
            "Enter your new password to finish the reset process."}
        </Typography>
      </Stack>
      <Form as="form" onSubmit={onSubmit} noValidate>
        {activeStep === 0 && (
          <>
            <FormControl>
              <FormLabel htmlFor="email" required>
                Email
              </FormLabel>
              <TextField
                error={!!errors.email}
                helperText={<FieldErrorList errors={errors.email} />}
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
          </>
        )}
        {activeStep === 1 && (
          <>
            <FormControl>
              <FormLabel htmlFor="code" required>
                Email Confirmation Code
              </FormLabel>
              <TextField
                error={!!errors.code}
                helperText={errors.code}
                value={inputs.code}
                onChange={onChange}
                id="code"
                type="text"
                name="code"
                placeholder="123456"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </>
        )}
        {activeStep === 2 && (
          <>
            <FormControl>
              <FormLabel htmlFor="password" required>
                Password
              </FormLabel>
              <TextField
                error={!!errors.password}
                helperText={<FieldErrorList errors={errors.password} />}
                value={inputs.password}
                onChange={onChange}
                id="password"
                type="password"
                name="password"
                placeholder="••••••"
                autoComplete="password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="repeatPassword" required>
                Repeat Password
              </FormLabel>
              <TextField
                error={!!errors.repeatPassword}
                helperText={<FieldErrorList errors={errors.repeatPassword} />}
                value={inputs.repeatPassword}
                onChange={onChange}
                id="repeatPassword"
                type="password"
                name="repeatPassword"
                placeholder="••••••"
                autoComplete="password"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </>
        )}

        <Stack direction="row" spacing={2}>
          <StepButton
            disabled={activeStep == 0} // Disable back button on first step 0 or confirmation code step
            onClick={handleBack}
            variant="contained"
            color="cream"
            sx={{ flex: 1 }}
          >
            Back
          </StepButton>

          {/* Submits form and triggers onSubmit function */}
          <StepButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{ flex: 1 }}
            loading={
              resetPasswordMutation.isPending ||
              confirmResetPasswordMutation.isPending
            } // Button is loading for both mutations
          >
            Next
          </StepButton>
        </Stack>
      </Form>
    </>
  );
};
