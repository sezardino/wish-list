"use client";

import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { ListModal } from "../modals/ListModal";

export interface DashboardTemplateProps
  extends ComponentPropsWithoutRef<"div"> {}

export const DashboardTemplate: FC<DashboardTemplateProps> = (props) => {
  const { className, ...rest } = props;
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(true);

  return (
    <div {...rest} className={className}>
      <ListModal
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen(false)}
      />
    </div>
  );
};
