"use client";

import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { BaseButton } from "../base/BaseButton";
import { ListModal } from "../modals/ListModal";

export type DashboardTemplateProps = ComponentPropsWithoutRef<"section"> & {};

export const DashboardTemplate: FC<DashboardTemplateProps> = (props) => {
  const { className, ...rest } = props;
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);

  return (
    <>
      <section {...rest} className={className}>
        <BaseButton onClick={() => setIsCreateListModalOpen(true)}>
          Create List
        </BaseButton>
      </section>
      <ListModal
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen(false)}
      />
    </>
  );
};
