import { FocusEvent } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import {
  BaseListBoxItem,
  BaseListbox,
  BaseListboxProps,
} from "../base/BaseListbox";

export type ControlledListboxProps<
  T extends FieldValues,
  V extends BaseListBoxItem
> = Omit<BaseListboxProps<V>, "value" | "onChange"> & {
  control: Control<T, any>;
  name: Path<T>;
};

export const ControlledListbox = <
  T extends FieldValues,
  V extends BaseListBoxItem
>(
  props: ControlledListboxProps<T, V>
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
    <BaseListbox
      {...rest}
      {...field}
      onBlur={blurHandler}
      isInvalid={!!error}
      errorMessage={error?.message}
    />
  );
};
