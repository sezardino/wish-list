import { reactToastify } from "@/libs/react-toastify";
import { apiService } from "@/services/api";
import { useTranslations } from "next-intl";
import { useCallback, type FC } from "react";
import { BaseModal, BaseModalProps } from "../base/BaseModal";
import { ListForm, ListFormValues } from "../forms/ListForm";

export type ListModalProps = Omit<
  BaseModalProps,
  "children" | "title" | "description" | "size"
> & {};

export const ListModal: FC<ListModalProps> = (props) => {
  const t = useTranslations("modals.list-create");
  const toastsT = useTranslations("toasts");

  const createListHandler = useCallback(
    async (values: ListFormValues) => {
      try {
        const response = await apiService.list.create({
          ...values,
          category: values.category?.[0],
        });

        if (!response.createList) throw new Error();

        reactToastify({
          type: "success",
          message: toastsT("list-create.success"),
        });
        props.onClose();
      } catch (error) {
        console.log(error);
        reactToastify({
          type: "error",
          message: toastsT("list-create.error"),
        });
      }
    },
    [props, toastsT]
  );

  return (
    <BaseModal
      {...props}
      size="2xl"
      title={t("title")}
      description={t("description")}
    >
      <ListForm tags={[]} categories={[]} onFormSubmit={createListHandler} />
    </BaseModal>
  );
};
