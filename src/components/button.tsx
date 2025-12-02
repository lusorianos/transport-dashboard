import { cva, type VariantProps } from "class-variance-authority";
import Icon from "./icon";
import Text from "./text";
import IconSpinner from "../assets/icons/spinner.svg?react";

export const buttonVariants = cva(
  `
    flex items-center justify-center cursor-pointer
    transition rounded-lg group gap-2 border border-solid
  `,
  {
    variants: {
      variant: {
        primary: "bg-white border-gray-300 hover:bg-red-base hover:border-transparent",
        secondary: "bg-red-base border-transparent hover:brightness-115",
        tertiary: "border-none border-0",
        tertiaryActive: "border-none border-0",
      },
      size: {
        sm: "p-1 h-5",
        md: "h-10 py-2 px-8",
      },
      disabled: {
        true: "opacity-50 pointer-events-none cursor-not-allowed",
      },
      handling: {
        true: "pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
      handling: false,
    },
  }
);

export const buttonIconVariants = cva("transition", {
  variants: {
    variant: {
      primary: "fill-gray-400 group-hover:fill-white",
      secondary: "fill-white",
      tertiary: "fill-gray-400 group-hover:fill-red-base",
      tertiaryActive: "fill-red-base",
    },
    size: {
      sm: "",
      md: "w-5 h-5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export const buttonTextVariants = cva("text-sm transition", {
  variants: {
    variant: {
      primary: "group-hover:text-white",
      secondary: "text-white",
      tertiary: "text-gray-400 group-hover:text-red-base",
      tertiaryActive: "text-red-base",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "size" | "disabled">,
    VariantProps<typeof buttonVariants> {
  icon?: React.ComponentProps<typeof Icon>["svg"];
  handling?: boolean;
}

export default function Button({
  variant,
  size,
  disabled,
  className,
  children,
  icon,
  handling,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ className, disabled, size, variant, handling })}
      {...props}
    >
      {icon && (
        <Icon
          svg={handling ? IconSpinner : icon}
          animate={handling}
          className={buttonIconVariants({ variant, size })}
        />
      )}
      <Text variant="body-md-bold" className={buttonTextVariants({ variant })}>
        {children}
      </Text>
    </button>
  );
}