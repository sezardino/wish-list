import { FocusEvent } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { BaseInput, BaseInputProps } from "../base/BaseInput";

export type ControlledInputProps<T extends FieldValues> = BaseInputProps & {
  control: Control<T, any>;
  name: Path<T>;
};

export const ControlledInput = <T extends FieldValues>(
  props: ControlledInputProps<T>
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
    <BaseInput
      {...rest}
      {...field}
      // @ts-ignore
      onBlur={blurHandler}
      isInvalid={!!error}
      errorMessage={error?.message}
    />
  );
};
