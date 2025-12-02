import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  `
    rounded-xl border border-solid border-gray-300
    bg-white
  `,
  {
    variants: {
      size: {
        none: "",
        md: "p-6",
        lg: "p-6 md:p-8",
      }
    },
    defaultVariants: {
      size: "none",
    }
  }
);

interface CardProps extends VariantProps<typeof cardVariants>,
  React.ComponentProps<"div"> {
    as?: keyof React.JSX.IntrinsicElements;
  }

export default function Card({
  as="div",
  size,
  children,
  className,
  ...props
}: CardProps) {
  return React.createElement(
    as,
    {
      className: cardVariants({size, className}),
      ...props
    },
    children
  )
}