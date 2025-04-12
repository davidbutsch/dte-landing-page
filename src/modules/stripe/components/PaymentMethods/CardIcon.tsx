import { SVGProps } from "react";

const cardUrl = (brand: string) => `/public/cards/${brand}.svg`;

export type CardIconOptions = {
  brand: string;
} & SVGProps<HTMLImageElement>;

export const CardIcon = ({ brand, ...props }: CardIconOptions) => {
  return <img src={cardUrl(brand)} {...props} />;
};
