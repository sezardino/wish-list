"use client";

import { Input, InputProps } from "@nextui-org/input";
import {
  FocusEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useState,
} from "react";
import { Icon } from "./Icon";

export type BaseInputProps = Omit<
  InputProps,
  "variant" | "labelPlacement" | "radius" | "colors" | "onBlur"
> & {
  onBlur?: (evt: FocusEvent<HTMLInputElement, Element>) => void;
};

const BaseInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  BaseInputProps
> = (props, ref) => {
  const { endContent, type, ...rest } = props;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const currentType =
    type !== "password" ? type : isVisible ? "text" : "password";

  const endContentJSX =
    type === "password" ? (
      <button
        className="focus:outline-none"
        type="button"
        onClick={toggleVisibility}
      >
        <Icon
          name={isVisible ? "HiEyeOff" : "HiEye"}
          className="text-2xl text-default-400 pointer-events-none"
        />
      </button>
    ) : (
      endContent
    );

  return (
    // @ts-ignore
    <Input
      {...rest}
      ref={ref}
      type={currentType}
      variant="bordered"
      labelPlacement="outside"
      placeholder={rest.placeholder || " "}
      radius="sm"
      endContent={endContentJSX}
    />
  );
};

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  BaseInputComponent
);
