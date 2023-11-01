import { Listbox, ListboxProps, Transition } from "@headlessui/react";
import { ForwardRefRenderFunction, Fragment, forwardRef } from "react";
import * as hiIcons from "react-icons/hi";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Icon, IconNames } from "./Icon";

const iconsArray = Object.keys(hiIcons) as IconNames[];

export type IconsSelectProps = ListboxProps<"div", IconNames, IconNames> &
  Pick<BaseInputProps, "isInvalid" | "errorMessage" | "description"> & {
    label: string;
    onChange: (value: IconNames) => void;
    className?: string;
  };

const IconsSelectComponent: ForwardRefRenderFunction<
  HTMLElement,
  IconsSelectProps
> = (props, ref) => {
  const {
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
        startContent={value ? <Icon name={value} /> : null}
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
        <Listbox.Options className="absolute top-full mt-1 z-10 subpixel-antialiased box-border outline-none text-small bg-content1 rounded-large shadow-medium w-full p-1 min-w-[200px] max-h-60 overflow-auto flex flex-wrap gap-2">
          {iconsArray.map((icon) => (
            <Listbox.Option
              key={icon}
              className={({ selected, active }) =>
                `relative cursor-default select-none p-2 ${
                  (selected || active) && "bg-gray-100"
                }`
              }
              value={icon}
            >
              <Icon name={icon} />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export const IconsSelect = forwardRef(IconsSelectComponent);
