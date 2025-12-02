import { cva, cx, type VariantProps } from "class-variance-authority";
import React from "react";

export const iconVariants = cva("", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
    },
    animate: {
      true: "animate-spin",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    animate: false,
  },
});

interface IconProps
  extends React.ComponentProps<"svg">,
    VariantProps<typeof iconVariants> {
  svg: React.FC<React.ComponentProps<"svg">>;
}

export default function Icon({
  svg: SvgComponent,
  animate = false,
  size = "md",
  className,
  ...props
}: IconProps) {
  return (
    <SvgComponent
      className={cx(iconVariants({ animate, size }), className)}
      {...props}
    />
  );
}