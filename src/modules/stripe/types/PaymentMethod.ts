export type CardCheck = `pass` | `fail` | `unavailable` | `unchecked`;

export type PaymentMethod = {
  id: string;
  type: string;
  billing: {
    postalCode: string | null;
    country: string | null; // two letter country code
  };
  card: {
    checks: {
      addressLine: CardCheck | null;
      addressPostalCode: CardCheck | null;
      cvc: CardCheck | null;
    };
    country: string | null;
    brand: string;
    expires: string; // the expiration date of the card in MM/YYYY format
    funding: string; // the funding type of the card (credit, debit, prepaid, etc.)
    last4: string;
  };
};
