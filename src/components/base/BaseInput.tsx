"use client";

import { Input, InputProps } from "@nextui-org/input";
import { FC, FocusEvent, useState } from "react";
import { Icon } from "./Icon";

export type BaseInputProps = Omit<
  InputProps,
  "variant" | "labelPlacement" | "radius" | "colors" | "onBlur"
> & {
  onBlur?: (evt: FocusEvent<HTMLInputElement, Element>) => void;
};

export const BaseInput: FC<BaseInputProps> = (props) => {
  const { type, ...rest } = props;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const currentType =
    type !== "password" ? type : isVisible ? "text" : "password";

  return (
    // @ts-ignore
    <Input
      {...rest}
      type={currentType}
      variant="bordered"
      labelPlacement="outside"
      radius="sm"
      endContent={
        type === "password" && (
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
        )
      }
    />
  );
};
