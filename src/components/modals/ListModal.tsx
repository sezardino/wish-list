import { useCreateListMutation } from "@/hooks/react-query/mutation/create-list";
import { useTagsAndCategoriesQuery } from "@/hooks/react-query/query/tags-and-categories";
import { useTranslations } from "next-intl";
import { useCallback, type FC } from "react";
import { BaseModal, BaseModalProps } from "../base/BaseModal";
import { LoadingOverlay } from "../base/LoadingOverlay";
import { ListForm, ListFormValues } from "../forms/ListForm";

export type ListModalProps = Omit<
  BaseModalProps,
  "children" | "title" | "description" | "size"
> & {};

export const ListModal: FC<ListModalProps> = (props) => {
  const { onClose, ...rest } = props;
  const t = useTranslations("modals.list-create");

  const {
    data: tagsAndCategoriesData,
    isFetching: isTagsAndCategoriesLoading,
  } = useTagsAndCategoriesQuery({
    tags: { type: "LIST" },
    categories: { type: "LIST" },
    enabled: props.isOpen || false,
  });

  const { mutateAsync: createList, isPending: isCreateListPending } =
    useCreateListMutation();

  const createListHandler = useCallback(
    async (values: ListFormValues) => {
      try {
        await createList({
          ...values,
          category: values.category?.[0],
        });

        onClose();
      } catch (error) {
        console.log(error);
      }
    },
    [createList, onClose]
  );

  const isLoading = isTagsAndCategoriesLoading || isCreateListPending;

  return (
    <BaseModal
      {...rest}
      size="2xl"
      title={t("title")}
      description={t("description")}
      className="py-4"
      onClose={onClose}
    >
      {isLoading && (
        <LoadingOverlay
          skeletonSize={isTagsAndCategoriesLoading ? "2xl" : undefined}
        />
      )}
      {!isTagsAndCategoriesLoading && (
        <ListForm
          tags={tagsAndCategoriesData?.tags || []}
          categories={tagsAndCategoriesData?.categories || []}
          onFormSubmit={createListHandler}
        />
      )}
    </BaseModal>
  );
};
