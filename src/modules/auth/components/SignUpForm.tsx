import {
  INVALID_VERIFICATION_CODE_ERROR,
  normalizePhoneNumber,
  USERNAME_EXISTS_ERROR,
} from "@/common";
import { FieldErrorList, openErrorDialog } from "@/components";
import { storeUser } from "@/modules/auth/hooks";
import {
  ConfirmationCodeSchema,
  PasswordsSchema,
  ProfileSchema,
} from "@/modules/auth/schemas";
import { autoSignIn, confirmSignUp, signUp } from "@aws-amplify/auth";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

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

const fields = [
  "email",
  "phoneNumber",
  "firstName",
  "lastName",
  "password",
  "repeatPassword",
  "code",
];

const initialInputsState = Object.fromEntries(
  fields.map((field) => [field, ""])
) as Record<(typeof fields)[number], string>;

const initialErrorsState = Object.fromEntries(
  fields.map((field) => [field, []])
) as Record<(typeof fields)[number], string[]>;

/**
 * SignUpForm component handles the user sign-up process.
 * It consists of two steps: entering email and display name, and setting a password.
 * The form validates inputs and displays error messages if necessary.
 * On successful submission, it creates a new user and navigates to the home page.
 */
export const SignUpForm = () => {
  // STATE
  const [activeStep, setActiveStep] = useState(0);
  const [inputs, setInputs] = useState(initialInputsState);
  const [errors, setErrors] = useState(initialErrorsState);

  // API
  const signUpUserMutation = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      switch (error.name) {
        // If the email is already in use, set email error message and jump back to the profile step
        case USERNAME_EXISTS_ERROR:
          setErrors((current) => ({
            ...current,
            email: ["Email already registered"],
          }));
          setActiveStep(0);
          break;
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
  const confirmSignUpUserMutation = useMutation({
    mutationFn: confirmSignUp,
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
      // After sign up is confirmed, sign in user
      await autoSignIn();

      // After user is signed in, set user state
      await storeUser();

      // Finally, navigate to root with page reload
      window.location.href = "/";
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
      case 0:
        setActiveStep((prevStep) => prevStep + 1);
        break;
      // At this step we are at the sign up submission form
      case 1:
        // Sign up user
        signUpUserMutation.mutate({
          username: inputs.email,
          password: inputs.password,
          options: {
            autoSignIn: true,
            userAttributes: {
              given_name: inputs.firstName,
              family_name: inputs.lastName,
              // TODO integrate with zod
              phone_number: normalizePhoneNumber(inputs.phoneNumber) || "",
            },
          },
        });
        break;
      // At this stage the user has been signed up and has recieved a confirmation code
      case 2:
        // Confirm sign up with emailed confirmation code
        confirmSignUpUserMutation.mutate({
          username: inputs.email,
          confirmationCode: inputs.code,
        });
    }
  };

  /**
   * Validates the inputs for a specific step in the sign-up form.
   *
   * @param step The current step of the sign-up process (0 for profile, 1 for passwords).
   * @returns True if there are no validation errors, otherwise false.
   */
  const validateStepInputs = (step: number): boolean => {
    // Reset the error state for all input fields
    setErrors(initialErrorsState);

    // Select appropriate data/schema required to validate current step
    const stepData = [
      {
        email: inputs.email,
        phoneNumber: inputs.phoneNumber,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
      },
      { password: inputs.password, repeatPassword: inputs.repeatPassword },
      { code: inputs.code },
    ][step];
    const stepSchema = [ProfileSchema, PasswordsSchema, ConfirmationCodeSchema][
      step
    ];

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
      phoneNumber: unsafeErrors?.phoneNumber || current.phoneNumber,
      firstName: unsafeErrors?.firstName || current.firstName,
      lastName: unsafeErrors?.lastName || current.lastName,
      password: unsafeErrors?.password || current.password,
      repeatPassword: unsafeErrors?.repeatPassword || current.password,
      code: unsafeErrors?.code || current.code,
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
          <FormControl>
            <FormLabel htmlFor="phoneNumber" required>
              Phone Number
            </FormLabel>
            <TextField
              error={!!errors.phoneNumber}
              helperText={<FieldErrorList errors={errors.phoneNumber} />}
              value={inputs.phoneNumber}
              onChange={onChange}
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="(123) 456-7890"
              autoComplete="tel"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="firstName" required>
              First Name
            </FormLabel>
            <TextField
              error={!!errors.firstName}
              helperText={<FieldErrorList errors={errors.firstName} />}
              value={inputs.firstName}
              onChange={onChange}
              id="firstName"
              type="text"
              name="firstName"
              placeholder="John"
              autoComplete="given-name"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName" required>
              Last Name
            </FormLabel>
            <TextField
              error={!!errors.lastName}
              helperText={<FieldErrorList errors={errors.lastName} />}
              value={inputs.lastName}
              onChange={onChange}
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Doe"
              autoComplete="family-name"
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
      {activeStep === 2 && (
        <>
          <FormControl>
            <FormLabel htmlFor="code" required>
              Confirmation Code
            </FormLabel>
            <TextField
              error={!!errors.code}
              helperText={
                "If you do not recieve a confirmation code please navigate to the main page (clicking on the DTE icon) and reload. Thank you."
              }
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
      <Stack direction="row" spacing={2}>
        <StepButton
          disabled={activeStep == 0 || activeStep == 2} // Disable back button on first step 0 or confirmation code step
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
            signUpUserMutation.isPending || confirmSignUpUserMutation.isPending
          } // Button is loading for both mutations
        >
          Next
        </StepButton>
      </Stack>
    </Form>
  );
};

export default SignUpForm;
