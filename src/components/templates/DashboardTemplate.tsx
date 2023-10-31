"use client";

import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { BaseButton } from "../base/BaseButton";
import { ListFormValues } from "../forms/ListForm";
import { ListModal } from "../modals/ListModal";

export type DashboardTemplateProps = ComponentPropsWithoutRef<"section"> & {
  onCreateList: (values: ListFormValues) => Promise<any>;
};

export const DashboardTemplate: FC<DashboardTemplateProps> = (props) => {
  const { onCreateList, className, ...rest } = props;
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);

  const createListHandler = async (values: ListFormValues) => {
    try {
      await onCreateList(values);
      setIsCreateListModalOpen(false);
    } catch (error) {}
  };

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
        onFormSubmit={createListHandler}
      />
    </>
  );
};
