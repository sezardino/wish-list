"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";
import { ListCard } from "../modules/app/ListCard";

export type DashboardTemplateProps = ComponentPropsWithoutRef<"section"> & {};

export const DashboardTemplate: FC<DashboardTemplateProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <>
      <section {...rest} className={className}>
        <ul className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {new Array(5).fill(null).map((_, i) => (
            <li key={i}>
              <ListCard
                name="List name"
                icon="HiAcademicCap"
                itemsCount={5}
                category="dupa"
                tags={["awesome", "not awesome"]}
                description={"dupa"}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
