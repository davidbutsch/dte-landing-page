import { openErrorDialog } from "@/components";
import {
  AddPaymentMethod,
  CheckoutSchema,
  createCustomerPayment,
  createCustomerSubscription,
  InvoicePaidDialog,
  PaymentMethods,
  Product,
} from "@/modules/stripe";
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const fields = ["fullName", "phone", "grade"];

// Object with properties containing empty strings
const initialInputsState = Object.fromEntries(
  fields.map((field) => [field, ""])
);

// Object with properties containing empty arrays
const initialErrorsState = initialInputsState;
export type CheckoutFormOptions = {
  product: Product;
};

export const CheckoutForm = ({ product }: CheckoutFormOptions) => {
  const priceId = product.defaultPrice!.id; // TODO: Handle case where no default price exists

  // STATE
  const [invoicePaidDialogOpen, setInvoicePaidDialogOpen] = useState(false);

  const [inputs, setInputs] = useState(initialInputsState);
  const [errors, setErrors] = useState(initialErrorsState);

  // API
  const createCustomerSubscriptionMutation = useMutation({
    mutationFn: () =>
      createCustomerSubscription([{ price: priceId, quantity: 1 }]),
    onSuccess: () => {
      setInvoicePaidDialogOpen(true);
    },
  });
  const createCustomerPaymentMutation = useMutation({
    mutationFn: () => createCustomerPayment(priceId),
    onSuccess: () => {
      setInvoicePaidDialogOpen(true);
    },
    onError: (error) => openErrorDialog({ text: error.message }),
  });

  const isLoading =
    createCustomerPaymentMutation.isPending ||
    createCustomerSubscriptionMutation.isPending;

  // METHODS
  const onCheckout = () => {
    // Validate inputs before proceeding with checkout
    const isValid = validateInputs();
    if (!isValid) return;

    if (product.defaultPrice?.type === "one_time")
      createCustomerPaymentMutation.mutate();
    else if (product.defaultPrice?.type === "recurring")
      createCustomerSubscriptionMutation.mutate();

    console.log(product.defaultPrice?.type);
  };

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

  /**
   * Validates all inputs for the checkout form.
   *
   * @returns True if there are no validation errors, otherwise false.
   */
  const validateInputs = () => {
    // Reset the error state for all input fields
    setErrors({
      fullName: "",
      phone: "",
      grade: "",
    });

    /*
      Each 'errors' property corrosponds to an input field.
      The value of each property is an array of error message strings.
      These messages are joined together as one string when updating the error state below.
    */
    const errors = CheckoutSchema.safeParse({
      fullName: inputs.fullName,
      phone: inputs.phone,
    }).error?.flatten().fieldErrors;

    // Cast as any because I don't want to figure out these typing issues
    const unsafeErrors: any = errors;

    // Updates the error message for each input field
    setErrors((current) => ({
      fullName: unsafeErrors?.fullName?.join(", ") || current.fullName,
      phone: unsafeErrors?.phone?.join(", ") || current.phone,
    }));

    // Return true if no errors
    return !errors;
  };

  return (
    <>
      <Stack
        sx={{
          width: { xs: "100%", md: "50%" },
          padding: 4,
          gap: 4,
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Paper variant="outlined" sx={{ padding: 2 }}>
          <Stack gap={2}>
            <FormControl>
              <FormLabel htmlFor="email" required>
                Player Name
              </FormLabel>
              <TextField
                onChange={onChange}
                value={inputs.fullName}
                error={!!errors.fullName}
                helperText={errors.fullName}
                size="small"
                id="fullName"
                type="text"
                name="fullName"
                placeholder="John Doe"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone" required>
                Phone
              </FormLabel>
              <TextField
                onChange={onChange}
                value={inputs.phone}
                error={!!errors.phone}
                helperText={errors.phone}
                size="small"
                id="phone"
                type="text"
                name="phone"
                placeholder="(XXX) XXX-XXXX"
                autoComplete="tel"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel size="small" id="grade-select-label">
                Grade
              </InputLabel>
              <Select
                onChange={(event) => {
                  setInputs({ ...inputs, grade: event.target.value });
                }}
                value={inputs.grade}
                size="small"
                labelId="grade-select-label"
                id="grade"
                label="Grade"
              >
                <MenuItem value={0}>Kindergarten</MenuItem>
                <MenuItem value={1}>1st</MenuItem>
                <MenuItem value={2}>2nd</MenuItem>
                <MenuItem value={3}>3rd</MenuItem>
                <MenuItem value={4}>4th</MenuItem>
                <MenuItem value={5}>5th</MenuItem>
                <MenuItem value={6}>6th</MenuItem>
                <MenuItem value={7}>7th</MenuItem>
                <MenuItem value={8}>8th</MenuItem>
                <MenuItem value={9}>9th</MenuItem>
                <MenuItem value={10}>10th</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        <Stack gap={1} flexGrow={1}>
          <Typography variant="h6" fontWeight={600}>
            Payment Methods
          </Typography>
          <PaymentMethods />
          <Stack direction="row" justifyContent="space-between">
            <AddPaymentMethod />
            <Button
              variant="contained"
              color="secondary"
              onClick={onCheckout}
              disabled={isLoading}
              loading={isLoading}
            >
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <InvoicePaidDialog
        open={invoicePaidDialogOpen}
        setOpen={setInvoicePaidDialogOpen}
      />
    </>
  );
};
