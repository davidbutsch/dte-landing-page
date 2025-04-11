export type Customer = {
  id: string;
  description: string | null;
  email: string;
  invoice: {
    prefix: string | null;
    defaultPaymentMethod: string | null;
  };
  name: string | null;
};
