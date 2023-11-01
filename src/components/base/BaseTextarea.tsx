"use client";

import { Textarea, TextAreaProps } from "@nextui-org/input";
import { forwardRef, ForwardRefRenderFunction } from "react";

export type BaseTextareaProps = Omit<
  TextAreaProps,
  "variant" | "labelPlacement" | "radius" | "colors"
> & {};

const BaseTextareaComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  BaseTextareaProps
> = (props, ref) => {
  const { type, ...rest } = props;

  return (
    <Textarea
      {...rest}
      ref={ref}
      variant="bordered"
      labelPlacement="outside"
      placeholder={rest.placeholder || " "}
      radius="sm"
    />
  );
};

export const BaseTextarea = forwardRef(BaseTextareaComponent);
