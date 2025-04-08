import { keys } from "./keys";

export const isShallowEqual = (inputs1: object, inputs2: object) => {
  const inputKeys = keys(inputs1);

  // Check if every key pair from both input objects are equal
  const allInputsEqual = inputKeys.every((key) => inputs1[key] == inputs2[key]);

  return allInputsEqual;
};
