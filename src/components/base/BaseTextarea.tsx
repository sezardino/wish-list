"use client";

import { Textarea, TextAreaProps } from "@nextui-org/input";
import { FC } from "react";

export type BaseTextareaProps = Omit<
  TextAreaProps,
  "variant" | "labelPlacement" | "radius" | "colors"
> & {};

export const BaseTextarea: FC<BaseTextareaProps> = (props) => {
  const { type, ...rest } = props;

  return (
    <Textarea
      {...rest}
      variant="bordered"
      labelPlacement="outside"
      placeholder={rest.placeholder || " "}
      radius="sm"
    />
  );
};
