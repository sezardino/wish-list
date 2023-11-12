"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";

export type DashboardTemplateProps = ComponentPropsWithoutRef<"section"> & {};

export const DashboardTemplate: FC<DashboardTemplateProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <>
      <section {...rest} className={className}></section>
    </>
  );
};
