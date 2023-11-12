import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { BaseButton } from "../base/BaseButton";

export type AddEntityWidgetProps = ComponentPropsWithoutRef<"div"> & {};

export const AddEntityWidget: FC<AddEntityWidgetProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div {...rest} className={className}>
      <Popover placement="top">
        <PopoverTrigger>
          <BaseButton icon="HiPlusCircle" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <BaseButton icon="HiInbox" />
            <BaseButton icon="HiInbox" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
