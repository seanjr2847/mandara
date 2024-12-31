"use client";

import { Button as BaseButton } from "../button";
import { ButtonProps } from "@/components/ui/button";

const Button = (props: ButtonProps) => {
  return <BaseButton {...props} />;
};

export default Button;
