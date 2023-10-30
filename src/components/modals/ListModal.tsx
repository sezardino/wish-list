import { useTranslations } from "next-intl";
import { type FC } from "react";
import { BaseModal, BaseModalProps } from "../base/BaseModal";
import { ListForm } from "../forms/ListForm";

export type ListModalProps = Omit<
  BaseModalProps,
  "children" | "title" | "description" | "size"
> & {};

export const ListModal: FC<ListModalProps> = (props) => {
  const { ...rest } = props;
  const t = useTranslations("modals.list-create");

  return (
    <BaseModal
      {...rest}
      size="2xl"
      title={t("title")}
      description={t("description")}
    >
      <ListForm tags={[]} categories={[]} />
    </BaseModal>
  );
};
