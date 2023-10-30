import { Control, FieldValues, Path, useController } from "react-hook-form";
import { BaseInputProps } from "../base/BaseInput";
import { BaseTextarea } from "../base/BaseTextarea";

export type ControlledTextareaProps<T extends FieldValues> = BaseInputProps & {
  control: Control<T, any>;
  name: Path<T>;
};

export const ControlledTextarea = <T extends FieldValues>(
  props: ControlledTextareaProps<T>
) => {
  const { name, control, className, onBlur, ...rest } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <BaseTextarea
      {...rest}
      {...field}
      isInvalid={!!error}
      errorMessage={error?.message}
    />
  );
};
