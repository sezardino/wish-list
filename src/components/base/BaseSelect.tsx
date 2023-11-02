import { Listbox, ListboxProps, Transition } from "@headlessui/react";
import { ForwardRefRenderFunction, Fragment, forwardRef } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { BaseListBoxItem } from "./BaseListbox";
import { Icon } from "./Icon";
import { Typography } from "./Typography";

export type BaseSelectProps<Value extends BaseListBoxItem> = ListboxProps<
  "div",
  Value,
  string
> &
  Pick<BaseInputProps, "isInvalid" | "errorMessage" | "description"> & {
    label: string;
    className?: string;
    items: BaseListBoxItem[];
  };

const BaseSelectComponent: ForwardRefRenderFunction<
  HTMLElement,
  BaseSelectProps<BaseListBoxItem>
> = (props, ref) => {
  const {
    items,
    value,
    errorMessage,
    isInvalid,
    description,
    label,
    placeholder,
    className,
    ...rest
  } = props;

  return (
    <Listbox {...rest} ref={ref} as="div" value={value} className="relative">
      <Listbox.Button
        as={BaseInput}
        label={label}
        isReadOnly
        value={items.find((item) => item.id === (value || ""))?.label ?? ""}
        endContent={<Icon name="HiChevronDoubleDown" color="gray" />}
        placeholder={!value ? placeholder : ""}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        description={description}
      />
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute top-full mt-1 z-10 subpixel-antialiased box-border outline-none text-small bg-content1 rounded-large shadow-medium w-full p-1 min-w-[200px] max-h-60 overflow-auto">
          {items.map((item) => (
            <Listbox.Option
              key={item.id}
              as={Typography}
              tag="p"
              className={({ selected, active }) =>
                `relative cursor-default select-none p-2 ${
                  (selected || active) && "bg-gray-100"
                }`
              }
              value={item.id}
            >
              {item.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export const BaseSelect = forwardRef(BaseSelectComponent);
