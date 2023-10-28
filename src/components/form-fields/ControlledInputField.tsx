import { FocusEvent } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { InputField, InputFieldProps } from "./InputField";

export type ControlledInputFieldProps<T extends FieldValues> =
  InputFieldProps & {
    control: Control<T, any>;
    name: Path<T>;
  };

export const ControlledInputField = <T extends FieldValues>(
  props: ControlledInputFieldProps<T>
) => {
  const { name, control, className, onBlur, ...rest } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const blurHandler = (evt: FocusEvent<HTMLInputElement, Element>) => {
    if (onBlur) onBlur(evt);
    field.onBlur();
  };

  return (
    <InputField
      {...rest}
      {...field}
      error={error?.message}
      onBlur={blurHandler}
    />
  );
};
