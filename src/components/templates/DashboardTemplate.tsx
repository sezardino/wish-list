"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";

export interface DashboardTemplateProps
  extends ComponentPropsWithoutRef<"div"> {}

export const DashboardTemplate: FC<DashboardTemplateProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <div {...rest} className={className}>
      {/* <ListModal isOpen /> */}
    </div>
  );
};
