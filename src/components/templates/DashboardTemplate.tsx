"use client";

import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { BaseButton } from "../base/BaseButton";
import { ItemModal } from "../modals/ItemModal";
import { ListModal } from "../modals/ListModal";

export type DashboardTemplateProps = ComponentPropsWithoutRef<"section"> & {};

export const DashboardTemplate: FC<DashboardTemplateProps> = (props) => {
  const { className, ...rest } = props;
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);

  return (
    <>
      <section {...rest} className={className}>
        <BaseButton onClick={() => setIsCreateListModalOpen(true)}>
          Create List
        </BaseButton>
        <BaseButton onClick={() => setIsCreateItemModalOpen(true)}>
          Create Item
        </BaseButton>
      </section>
      <ListModal
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen(false)}
      />
      <ItemModal
        isOpen={isCreateItemModalOpen}
        onClose={() => setIsCreateItemModalOpen(false)}
      />
    </>
  );
};
