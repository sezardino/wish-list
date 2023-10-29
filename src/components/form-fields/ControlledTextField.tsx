import { FocusEvent } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { TextField, TextFieldProps } from "./TextField";

export type ControlledTextFieldProps<T extends FieldValues> = TextFieldProps & {
  control: Control<T, any>;
  name: Path<T>;
};

export const ControlledTextField = <T extends FieldValues>(
  props: ControlledTextFieldProps<T>
) => {
  const { name, control, className, onBlur, ...rest } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const blurHandler = (evt: FocusEvent<Element, Element>) => {
    if (onBlur) onBlur(evt);
    field.onBlur();
  };

  return (
    <TextField
      {...rest}
      {...field}
      onBlur={blurHandler}
      isInvalid={!!error}
      errorMessage={error?.message}
    />
  );
};
