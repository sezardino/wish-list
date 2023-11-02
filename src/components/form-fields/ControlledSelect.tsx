import { FocusEvent } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { BaseListBoxItem } from "../base/BaseListbox";
import { BaseSelect, BaseSelectProps } from "../base/BaseSelect";

export type ControlledSelectProps<
  T extends FieldValues,
  V extends BaseListBoxItem
> = Omit<BaseSelectProps<V>, "value" | "onChange"> & {
  control: Control<T, any>;
  name: Path<T>;
};

export const ControlledSelect = <
  T extends FieldValues,
  V extends BaseListBoxItem
>(
  props: ControlledSelectProps<T, V>
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
    // @ts-ignore
    <BaseSelect
      {...rest}
      {...field}
      onBlur={blurHandler}
      isInvalid={!!error}
      errorMessage={error?.message}
    />
  );
};
