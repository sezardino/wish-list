import { Control, FieldValues, Path, useController } from "react-hook-form";
import { IconsSelect, IconsSelectProps } from "../base/IconsSelect";

export type ControlledIconsSelectProps<T extends FieldValues> = Omit<
  IconsSelectProps,
  "value" | "onChange"
> & {
  control: Control<T, any>;
  name: Path<T>;
};

export const ControlledIconsSelect = <T extends FieldValues>(
  props: ControlledIconsSelectProps<T>
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
    <IconsSelect
      {...rest}
      {...field}
      isInvalid={!!error}
      errorMessage={error?.message}
    />
  );
};
