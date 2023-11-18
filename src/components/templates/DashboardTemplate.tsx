"use client";

import { DashboardListsResponse } from "@/services/server/modules/lists/schema";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { BasePagination } from "../base/BasePagination";
import { IconNames } from "../base/Icon";
import { ListCard } from "../modules/app/ListCard";

const DEFAULT_PER_PAGE = 10;

export type DashboardTemplateProps = ComponentPropsWithoutRef<"section"> & {
  listsData?: DashboardListsResponse;
  onPageChange: (page: number) => void;
};

export const DashboardTemplate: FC<DashboardTemplateProps> = (props) => {
  const { onPageChange, listsData, className, ...rest } = props;

  return (
    <>
      <section {...rest} className={className}>
        {!!listsData?.lists.length && (
          <>
            <ul className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
              {listsData.lists.map((list) => (
                <li key={list.id}>
                  <ListCard
                    name={list.name}
                    icon={list.icon as IconNames | null}
                    itemsCount={list._count.items}
                    category={list.category}
                    tags={list.tags}
                    description={list.description}
                  />
                </li>
              ))}
            </ul>
            <BasePagination
              current={listsData.meta.page}
              onPageChange={onPageChange}
              total={listsData.meta.totalPages}
              className="mt-5"
            />
          </>
        )}
      </section>
    </>
  );
};
