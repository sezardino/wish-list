import { Pagination } from "@nextui-org/react";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type BasePaginationProps = ComponentPropsWithoutRef<"div"> & {
  total: number;
  onPageChange: (page: number) => void;
  current: number;
};

export const BasePagination: FC<BasePaginationProps> = (props) => {
  const { total, current, onPageChange, className, ...rest } = props;

  return (
    <Pagination
      as="div"
      isCompact
      showControls
      color="warning"
      onChange={onPageChange}
      total={total}
      page={current}
      className={twMerge(className)}
    />
  );
};
