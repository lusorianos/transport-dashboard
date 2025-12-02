import { cva, type VariantProps, cx } from "class-variance-authority";
import React from 'react'
import { textVariants } from "./text";
import Text from "./text";

export const inputTextVariants = cva(`
  text-sm border rounded border-solid border-gray-300 focus:border-red-base bg-transparent outline-none  
`, {
  variants: {
    size:{
      md: "p-2",
    },
    disabled: {
      true: "pointer-events-none"
    }
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  }
});

interface InputTextProps extends VariantProps<typeof inputTextVariants>,
  Omit<React.ComponentProps<"input">, "size" | "disabled"> {
  label?: string;
  placeholder?: string;
}

export default function InputText({
  size,
  disabled,
  className,
  label,
  placeholder,
  ...props
}: InputTextProps){
  return (
    <label className="flex flex-col gap-1 w-full">
      {label && (
        <Text variant={"body-sm"}>
          {label}
        </Text>
      )}

      <input
        className={cx(inputTextVariants({ size, disabled }), textVariants(), className)}
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
}