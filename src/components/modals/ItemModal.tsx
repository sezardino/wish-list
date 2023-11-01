import { useSimpleListsQuery } from "@/hooks/react-query/query/simple-lists";
import { useTagsAndCategoriesQuery } from "@/hooks/react-query/query/tags-and-categories";
import { useTranslations } from "next-intl";
import { type FC } from "react";
import { BaseModal, BaseModalProps } from "../base/BaseModal";
import { ItemForm } from "../forms/ItemForm";

export type ItemModalProps = Omit<
  BaseModalProps,
  "children" | "title" | "description" | "size"
> & {};

export const ItemModal: FC<ItemModalProps> = (props) => {
  const t = useTranslations("modals.list-create");
  const toastsT = useTranslations("toasts");

  const { data: tagsAndCategoriesData, isLoading: isTagsAndCategoriesLoading } =
    useTagsAndCategoriesQuery({
      categories: { type: "ITEM" },
      tags: { type: "ITEM" },
    });

  const { data: listsData, isLoading: isListsLoading } = useSimpleListsQuery();

  // TODO: create proper function
  // const createListHandler = useCallback(
  //   async (values: ListFormValues) => {
  //     try {
  //       const response = await apiService.list.create({
  //         ...values,
  //         category: values.category?.[0],
  //       });

  //       if (!response.createList) throw new Error();

  //       reactToastify({
  //         type: "success",
  //         message: toastsT("list-create.success"),
  //       });
  //       props.onClose();
  //     } catch (error) {
  //       console.log(error);
  //       reactToastify({
  //         type: "error",
  //         message: toastsT("list-create.error"),
  //       });
  //     }
  //   },
  //   [props, toastsT]
  // );

  return (
    <BaseModal
      {...props}
      size="2xl"
      title={t("title")}
      description={t("description")}
      className="py-4"
    >
      <ItemForm
        lists={listsData?.lists || []}
        tags={tagsAndCategoriesData?.tags || []}
        categories={tagsAndCategoriesData?.categories || []}
        onFormSubmit={() => undefined}
      />
    </BaseModal>
  );
};
