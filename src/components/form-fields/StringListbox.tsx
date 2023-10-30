import { Chip } from "@nextui-org/react";
import {
  useCallback,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { FieldValues } from "react-hook-form";
import { BaseListBoxItem } from "../base/BaseListbox";
import { Typography } from "../base/Typography";
import { ControlledListbox, ControlledListboxProps } from "./ControlledListbox";

export type StringListboxProps<
  T extends FieldValues,
  V extends BaseListBoxItem
> = ComponentPropsWithoutRef<"div"> &
  Pick<
    ControlledListboxProps<T, V>,
    "control" | "name" | "label" | "placeholder" | "noFound"
  > & {
    items: string[];
    selected?: string[];
    selectedCopy?: string;
    createCopy: string;
  };

const stringToBaseListboxItem = (s: string) => ({
  id: s,
  label: s.toLowerCase().replace(/-/g, " "),
});

export const StringListbox = <T extends FieldValues, V extends BaseListBoxItem>(
  props: StringListboxProps<T, V>
) => {
  const {
    selected,
    selectedCopy,
    createCopy,
    control,
    name,
    items,
    noFound,
    label,
    placeholder,
    ...rest
  } = props;

  const [formattedItems, setFormattedItems] = useState<BaseListBoxItem[]>(() =>
    items.map(stringToBaseListboxItem)
  );
  const selectedItems = useMemo(() => {
    return formattedItems
      .filter((a) => selected?.includes(a.id))
      .map((a) => a.label);
  }, [selected, formattedItems]);

  const addNewItemHandler = useCallback(
    (input: string) => {
      const allTags = formattedItems.map((item) => item.label);

      allTags.push(input);

      setFormattedItems(
        Array.from(new Set(allTags)).map((item) =>
          stringToBaseListboxItem(item)
        )
      );
    },
    [formattedItems]
  );

  return (
    <div {...rest}>
      <ControlledListbox
        control={control}
        name={name}
        items={formattedItems}
        label={label}
        placeholder={placeholder}
        noFound={noFound}
        lastElement={(input) =>
          input ? (
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={() => addNewItemHandler(input)}
            >
              <Typography tag="span" styling="sm">
                {createCopy}
              </Typography>
              <Chip
                size="sm"
                as={Typography}
                tag="span"
                styling="xs"
                color="warning"
              >
                {input}
              </Chip>
            </button>
          ) : null
        }
      />
      {!!selectedItems.length && (
        <div className="mt-2 flex flex-wrap gap-2 items-center">
          <Typography tag="span" styling="xs">
            {selectedCopy}
          </Typography>
          <ul className="flex gap-1">
            {selectedItems.map((item) => (
              <li key={item}>
                <Chip as={Typography} tag="span" styling="xs" size="sm">
                  {item}
                </Chip>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
