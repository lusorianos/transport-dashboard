import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("font-sans", {//Por padrão tem esses valores
  variants: {//diferentes customizações para o componente
    variant: {
      "body-sm": "text-sm leading-5",
      "body-sm-bold": "text-sm leading-5 font-semibold",
      "body-md": "text-base leading-6 font-normal",
      "body-md-bold": "text-base leading-6 font-semibold",
      "body-xl": "text-xl leading-6 font-bold",
      "body-3xl": "text-2xl lg:text-3xl leading-6 font-bold",
    }
  },
  defaultVariants: {//variante por padrão
    variant: "body-md"
  }
})

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;//pega qualquer tag HTML
  className?: string;
  children?: React.ReactNode;//pega diversos tipos para um elemento ex: string, number, reactComponent
}

export default function text({ as = "span", variant, className, children, ...props}: TextProps){
  return React.createElement(
    as,
    {
      className: textVariants({variant, className}),
      ...props
    },
    children
  )
}