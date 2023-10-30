import { Combobox, ComboboxProps, Transition } from "@headlessui/react";
import {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Icon } from "./Icon";

export type BaseListBoxItem = {
  id: string;
  label: string;
};

type OmittedComboboxProps<Value extends BaseListBoxItem> = Omit<
  ComboboxProps<Value, false, true, "div">,
  "multiple" | "nullable" | "className" | "onChange"
>;

type BaseListItemRenderFunction = (input: string) => ReactNode;

type BaseListItemRenderFun<Value extends BaseListBoxItem> = (arg: {
  active: boolean;
  selected: boolean;
  disabled: boolean;
  item: Value;
}) => ReactElement;

export type BaseListboxProps<Value extends BaseListBoxItem> =
  OmittedComboboxProps<Value> &
    Pick<BaseInputProps, "isInvalid" | "errorMessage" | "description"> & {
      items: Value[];
      noFound: ReactNode | BaseListItemRenderFunction;
      lastElement?: ReactNode | BaseListItemRenderFunction;
      className?: string;
      label: string;
      value: string | string[];
      renderItem?: BaseListItemRenderFun<Value>;
      isSingleValue?: boolean;
      onChange: (value: Value[]) => void;
    };

export const BaseListbox = <Value extends BaseListBoxItem>(
  props: BaseListboxProps<Value>
) => {
  const {
    renderItem = defaultRenderItem,
    errorMessage,
    isInvalid,
    isSingleValue = false,
    description,
    value,
    items,
    noFound,
    label,
    lastElement,
    placeholder,
    className,
    onChange,
    ...rest
  } = props;
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput("");
  }, [items]);

  const filteredItems = useMemo(() => {
    return input === ""
      ? items
      : items.filter((item) =>
          item.label.toLowerCase().includes(input.toLowerCase())
        );
  }, [input, items]);

  const notFoundJSX = typeof noFound === "function" ? noFound(input) : noFound;

  const itemClassName =
    "flex group gap-2 items-center justify-between relative px-2 py-1.5 w-full h-full box-border rounded-small subpixel-antialiased tap-highlight-transparent outline-none";

  const lastElementJSX =
    typeof lastElement === "function" ? lastElement(input) : lastElement;

  const isNotFoundShown = items.length === 0 && input === "";

  return (
    <Combobox
      {...rest}
      as="div"
      value={value}
      multiple={true}
      nullable={false}
      onChange={(value) => {
        if (!Array.isArray(value)) return;

        const filteredValues = value.filter((item) => item !== null) as Value[];

        if (isSingleValue) {
          onChange([filteredValues[filteredValues.length - 1]]);
        } else {
          onChange(filteredValues);
        }
      }}
      className={twMerge("relative", className)}
    >
      <Combobox.Input
        as={BaseInput}
        label={label}
        value={input}
        placeholder={placeholder}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        description={description}
        onChange={(event) => setInput(event.target.value)}
        endContent={
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon
              name="HiChevronDoubleDown"
              size={20}
              className="text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        }
      />

      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setInput("")}
      >
        <Combobox.Options className="absolute top-full mt-1 z-10 subpixel-antialiased box-border outline-none text-small bg-content1 rounded-large shadow-medium w-full p-1 min-w-[200px] max-h-60 overflow-auto">
          {isNotFoundShown && (
            <div className={itemClassName}>{notFoundJSX}</div>
          )}

          {!isNotFoundShown && (
            <ul className="w-full flex flex-col gap-0.5 p-1 outline-none">
              {filteredItems.map((item) => (
                <Combobox.Option
                  as="li"
                  key={item.id}
                  className={({ active }) =>
                    twMerge(itemClassName, active && "bg-gray-100")
                  }
                  value={item.id}
                >
                  {(value) => renderItem({ ...value, item })}
                </Combobox.Option>
              ))}
              {!!lastElementJSX && (
                <li>
                  {!!filteredItems.length && <hr className="border-gray-200" />}
                  <Combobox.Option
                    value={null}
                    className={({ active }) =>
                      twMerge(
                        itemClassName,
                        !filteredItems.length && "mt-1",
                        active && "bg-gray-100"
                      )
                    }
                  >
                    {lastElementJSX}
                  </Combobox.Option>
                </li>
              )}
            </ul>
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

const defaultRenderItem: BaseListItemRenderFun<BaseListBoxItem> = ({
  active,
  selected,
  item,
}) => (
  <>
    <span className="flex-1 text-small font-normal truncate">{item.label}</span>

    {selected && (
      <Icon
        name="HiCheck"
        size={20}
        className={twMerge(`text-inherit flex-shrink-0`)}
        aria-hidden="true"
      />
    )}
  </>
);
