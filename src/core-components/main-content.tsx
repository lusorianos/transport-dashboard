import React from "react";
import {cx} from 'class-variance-authority'

interface MainContentProps extends React.ComponentProps<"main"> {}

export default function MainContent({children, className, ...props}: MainContentProps){
  return <main className={cx("max-w-[1890px] mx-auto", className)} {...props}>{children}</main>;
}