"use client";

import { Grid, Text, TextFieldInput } from "@radix-ui/themes";
import { ComponentPropsWithoutRef, useId, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type InputFieldProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "color" | "size"
> & {
  label: string;
  error?: string;
  description?: string;
};

export const InputField: FC<InputFieldProps> = (props) => {
  const { label, description, error, className, ...rest } = props;
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const descriptionId = `${fieldId}-description`;

  const isInvalid = !!error;

  return (
    <Grid gap="1">
      <label className={twMerge(className, "grid grid-cols-1 gap-2")}>
        <Text as="span" size="2">
          {label}
        </Text>
        <TextFieldInput
          {...rest}
          radius="large"
          id={fieldId}
          color={isInvalid ? "red" : undefined}
          variant={isInvalid ? "soft" : undefined}
          aria-describedby={descriptionId}
          aria-invalid={!!error}
          aria-errormessage={error && errorId}
        />
      </label>
      {description && (
        <Text as="p" size="1" id={descriptionId}>
          {description}
        </Text>
      )}

      {error && (
        <Text as="p" color="red" size="1" id={errorId}>
          {error}
        </Text>
      )}
    </Grid>
  );
};
