import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { BaseButton } from "../base/BaseButton";

export type AddEntityWidgetProps = ComponentPropsWithoutRef<"div"> & {
  onAddItemClick: () => void;
  onAddListClick: () => void;
};

export const AddEntityWidget: FC<AddEntityWidgetProps> = (props) => {
  const { onAddItemClick, onAddListClick, className, ...rest } = props;
  const t = useTranslations("components.add-entity-widget");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const buttonHandler = (type: "list" | "item") => {
    if (type === "list") {
      onAddListClick();
    } else {
      onAddItemClick();
    }

    setIsPopoverOpen(false);
  };

  return (
    <div {...rest} className={className}>
      <Popover isOpen={isPopoverOpen} placement="top">
        <PopoverTrigger>
          <BaseButton
            icon="HiPlusCircle"
            onClick={() => setIsPopoverOpen((prev) => !prev)}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="py-2 grid grid-cols-1 gap-3">
            <BaseButton
              icon="HiOutlineViewList"
              onClick={() => buttonHandler("list")}
              aria-label={t("add-list")}
            />
            <BaseButton
              icon="HiOutlinePuzzle"
              onClick={() => buttonHandler("item")}
              aria-label={t("add-item")}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
