import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { BaseButton } from "../base/BaseButton";

export type AddEntityWidgetProps = ComponentPropsWithoutRef<"div"> & {
  onAddItemClick: () => void;
  onAddListClick: () => void;
};

export const AddEntityWidget: FC<AddEntityWidgetProps> = (props) => {
  const { onAddItemClick, onAddListClick, className, ...rest } = props;
  const t = useTranslations("add-entity-widget");

  return (
    <div {...rest} className={className}>
      <Popover placement="top">
        <PopoverTrigger>
          <BaseButton icon="HiPlusCircle" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="py-2 grid grid-cols-1 gap-3">
            <BaseButton
              icon="HiOutlineViewList"
              onClick={onAddListClick}
              aria-label={t("add-list")}
            />
            <BaseButton
              icon="HiOutlinePuzzle"
              onClick={onAddItemClick}
              aria-label={t("add-item")}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
